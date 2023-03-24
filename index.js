
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

const employeeSchema = new mongoose.Schema({
    name: String,
    email: String,
    designation: String,
    phone: Number
})

const Employee = new mongoose.model("Employee", employeeSchema);

// -------------------------------------------------------------------------------------------

app.get('/', (req, res) => {
    console.log("get is working");
    res.send('get is working');
})

// -------------------------------------------------------------------------------------------

app.post('/insert', async (req, res) => {

    const dataInsert = new Employee({
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        phone: req.body.phone
    });

    const values = await dataInsert.save();
    res.send("data inserted successfully..\n" + values);
    // res.send(values.json());

})

// -------------------------------------------------------------------------------------------

//updating data
app.put('/update/:email', async (req, res) => {

    let newEmail = req.params.email;
    let newName = req.body.name;
    let newDesignation = req.body.designation;
    let newPhone = req.body.phone;

    Employee.findOneAndUpdate({ email: newEmail },
        { $set: { name: newName, designation: newDesignation, phone: newPhone } },
        { new: true },

    ).then((data) => {
        console.log("data updated\n" + data);
        res.send("data updated\n" + data);
    }).catch((err) => {
        console.log("error generated:- " + err);
        res.send("error generated\n" + err);
    })
})

// -------------------------------------------------------------------------------------------

app.get('/getAllEmployees', async (req, res) => {

    Employee.find().then(() => {
        console.log("all employees fetched\n" + res);
        // res.send("all employees fetched\n" + res);
        res.send("all employees fetched\n" + res);
    }).catch((err) => {
        console.log("error generated:- " + err);
        res.send("error generated\n" + err);
    })
})

// -------------------------------------------------------------------------------------------

app.delete('/deleteOne/:email', async (req, res) => {

    let newEmail = req.params.email;

    Employee.deleteOne({ email: newEmail }).then(() => {
        console.log("record deleted\n" + newEmail);
        res.send("record deleted\n" + newEmail);
    }).catch((err) => {
        console.log("error generated:- " + err);
        res.send("error generated\n" + err);
    })
})

// -------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`app is started on port no ${port}`);
})