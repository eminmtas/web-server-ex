const express = require('express');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
let messages = [];

app.use(morgan('dev')); // Logging middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/message', (req, res) => {
    const { message } = req.body;
    if (message) {
        messages.push(message);
        res.sendStatus(200);
    } else {
        res.status(400).send('Message is required');
    }
});

app.get('/messages', (req, res) => {
    res.json(messages);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
