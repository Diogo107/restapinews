const express = require('express');
const app = express();
const port = 3000;

app.get('/ping', (req, res) => {
    res.send('===> pong');
});

app.get('*', (req, res) => {
    res.send('Try to go to /ping');
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`))