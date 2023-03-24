
var express = require('express');
var app = express();
app.use(express.json());

var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 4000;

mongoose.connect("mongodb://localhost:27017/crudApp", {

    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    console.log("connection with database is successful");
}).catch(() => {

    console.log("connection with database is failed....");
})

// -------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    console.log("get is working");
    res.send('get is working');
})

// -------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`app is started on port no ${port}`);
})