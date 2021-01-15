'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
const TopNews = require('./Schemas/topNews')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000;
try {
    mongoose.connect(process.env.MONGOOSE_SECRET, {
        useNewUrlParser: true
    });
} catch (error) {
    console.log('===> Error: ', error)
}

app.get('/ping', async (req, res) => {
    res.send('===> pong');
});

app.get('/api/app', async (req, res) => {
    const result = await TopNews.find()
    console.log('===> Result', result)
    res.send('===> pong');
});

app.get('*', (req, res) => {
    res.send('Try to go to /ping');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));