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

// inserting record
app.post('/insert', async (req, res) => {

    const dataInsert = new Employee({
        name: req.body.name,
        email: req.body.email,
        designation: req.body.designation,
        phone: req.body.phone
    });

    const values = await dataInsert.save();
    res.send("data inserted successfully..\n" + values);
    console.log("data inserted successfully..\n" + values);

})

// -------------------------------------------------------------------------------------------

//updating record
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

// get all records
app.get('/getAllEmployees', async (req, res) => {

    Employee.find().then((data) => {
        console.log("all employees fetched\n" + data);
        res.send("all employees fetched\n" + data);
    }).catch((err) => {
        console.log("error generated:- " + err);
        res.send("error generated\n" + err);
    })
})

// -------------------------------------------------------------------------------------------

// get by email
app.get('/getByEmail/:email', (req, res) => {

    let newEmail = req.params.email;

    Employee.find(({ email: newEmail }))
        .then((data) => {
            if ((data == null) || (data.length == 0)) {
                console.log("record not found:-\n" + data);
                res.send("record not found:-\n" + data);
            } else {
                console.log("record fetched:-\n" + data);
                res.send("record fetched:-\n" + data);
            }
        })
        .catch((err) => {
            console.log("error generated:- " + err);
            res.send("error generated:- " + err);
        })
})

// -------------------------------------------------------------------------------------------

// delete record
app.delete('/deleteOne/:email', async (req, res) => {

    let newEmail = req.params.email;

    Employee.findOneAndDelete({ email: newEmail }).then((data) => {

        if ((data == null) || (data.length == 0)) {
            console.log("email not present :- " + newEmail);
            res.send("email not present :- " + newEmail);
        }
        else {
            console.log("record deleted :- " + newEmail);
            res.send("record deleted :- " + newEmail);
        }

    }).catch((err) => {
        console.log("error generated\n" + err);
        res.send("error generated\n" + err);
    })
})

// -------------------------------------------------------------------------------------------

app.listen(port, () => {
    console.log(`app is started on port no ${port}`);
})