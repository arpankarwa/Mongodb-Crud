
var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var port = 4000;


app.get('/', (req, res) => {
    console.log("get is working");
    res.send('get is working');
})


app.listen(port, () => {
    console.log(`app is started on port no ${port}`);
})