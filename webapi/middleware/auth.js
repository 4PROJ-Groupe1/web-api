const userMetier = require('../routes/user/metier');
const jwt = require('jsonwebtoken');

module.exports = {
    authenticateJWT: function (req, res, next) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            try {
                const token = authHeader.split(' ')[1];

                const base64Token = token.split('.')[1];
                const decodedValue = JSON.parse(Buffer.from(base64Token, "base64").toString("ascii"));

                let salt;

                userMetier.getUser(decodedValue.id).then(
                    userRes => {
                        salt = userRes.salt;

                        jwt.verify(token, salt, (err, user) => {
                            if (err) {
                                return res.sendStatus(403);
                            }

                            req.user = user;
                            next();
                        });
                    },
                    err => {
                        throw new Error(err);
                    }
                );
            } catch (e) {
                return res.sendStatus(403);
            }
        } else {
            res.sendStatus(401);
        }
    }
}
