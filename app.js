'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
const TopNews = require('./Schemas/topNews')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const cors = require("cors");
try {
    mongoose.connect(process.env.MONGOOSE_SECRET, {
        useNewUrlParser: true
    });
} catch (error) {
    console.log('===> Error: ', error)
}

app.use(cors());
app.get('/ping', async (req, res) => {
    res.send('===> pong');
});

app.get('/api/app', async (req, res) => {
    const result = await TopNews.find()
    res.json({result});
});

app.get('*', (req, res) => {
    res.send('News API on the /api/app');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));