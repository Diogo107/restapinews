'use strict';

require('dotenv').config()
const express = require('express');
const app = express();

const port = process.env.PORT || 5000;
//console.log('===> '. process.env.NODE_ENV)

app.get('/ping', (req, res) => {
    res.send('===> pong');
});

app.get('*', (req, res) => {
    res.send('Try to go to /ping');
});

app.listen(3000);
console.log(`Listening on port: ${port}`);