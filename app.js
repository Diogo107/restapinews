'use strict';

require('dotenv').config()
const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;
//console.log('===> '. process.env.NODE_ENV)

app.get('/ping', (req, res) => {
    res.send('===> pong');
});

app.get('*', (req, res) => {
    res.send('Try to go to /ping');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));