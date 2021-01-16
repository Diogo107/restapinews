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

app.get('/api/app/:category', async (req, res) => {
    console.log('this is a variable', req.params.category)
    const result = await TopNews.find({category:req.params.category})
    console.log('===> Result', result)
    res.json({result});
});

app.get('*', (req, res) => {
    res.send('Try to go to /ping');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));