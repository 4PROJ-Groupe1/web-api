const express = require('express');
var cors = require('cors');

// routes
const testApi = require('./routes/api/test');
const itemsApi = require('./routes/items/routes');
const commandesApi = require('./routes/commandes/routes');
const stockApi = require('./routes/stock/routes');
const rayonApi = require('./routes/rayon/routes');
const statsApi = require('./routes/stats/routes');
const userApi = require('./routes/user/routes');
const registerApi = require('./routes/register/routes');

const app = express();


// Connect Database
// connectDB();

// cors
app.use(cors({ origin: '*'}));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/test', testApi);
app.use('/api/items', itemsApi);
app.use('/api/commandes', commandesApi);
app.use('/api/stock', stockApi);
app.use('/api/rayon', rayonApi);
app.use('/api/stats', statsApi);
app.use('/api/user', userApi);
app.use('/api/register', registerApi);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));