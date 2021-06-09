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
                return res.status(403).json({"error": e.message});

            }
        } else {
            res.status(401).json({"error": new Error("error").message});
        }
    },

    loginWithToken: function(bearerToken) {
        const token = bearerToken.split(' ')[1];
        const base64Token = token.split('.')[1];
        const decodedValue = JSON.parse(Buffer.from(base64Token, "base64").toString("ascii"));
        return new Promise((resolve, reject) => {
            userMetier.getUser(decodedValue.id).then(
                userRes => {
                    resolve({user: { name: userRes?.name, surname: userRes?.surname, email: userRes?.email, role: userRes?.role, id: userRes?._id }, token: token});
                },
                err => {
                    reject(new Error(err));
                }
            );
        });
    }
}
