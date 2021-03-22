const express = require('express');
var cors = require('cors');

// routes
const testApi = require('./routes/api/test');

const app = express();


// Connect Database
// connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));

// use Routes
app.use('/api/test', testApi);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));