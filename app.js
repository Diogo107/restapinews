'use strict';

require('dotenv').config()
const express = require('express');
const app = express();
const TopNews = require('./Schemas/topNews')
const PORT = process.env.PORT || 3000;


app.get('/ping', async (req, res) => {
    TopNews.create( {
    title: "String",
    subtitle: "String",
    imageUrl: "String",
    content: ["String", "number"],
    url: "asdasdasd"+Math.floor(100*Math.random())
  })
    res.send('===> pong');
});

app.get('*', (req, res) => {
    res.send('Try to go to /ping');
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));