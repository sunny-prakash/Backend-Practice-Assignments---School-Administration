const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 8080;
const studentArray = require("./InitialData");
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// your code goes here
var id = studentArray + 1;
app.get("/api/student", (req, res) => {
    res.send(studentArray);
});

app.get("/api/student/:id", (req, res) => {
    let student = studentArray.find((s) => s.id === parseInt(req.params.id));
    if (!student) return res.status(400).send("data not found");
    res.send(student);
});

app.post("/api/student", (req, res) => {
    const { name, currentClass, division } = req.body;
    if (!name || !currentClass || !currentClass) return res.status(400).send("data not found");

    let student = {
        id: id++,
        name: name,
        currentClass: parseInt(currentClass),
        division: division,
    };
    studentArray.push(student);
    res.send({ id: student.id });
});

app.put("/api/student/:id", (req, res) => {
    const { name } = req.body;
    let student = studentArray.find((s) => s.id === req.params.id);
    if (!student) return res.status(400).send("data not found");
    if (!name) return res.status(400).send("data not found");

    student.name = name;
    res.send({ name: student.name });
});

app.delete("/api/student/:id", (req, res) => {
    let student = studentArray.find((s) => s.id === req.params.id);
    if (!student) return res.status(400).send("data not found");

    let index = studentArray.indexOf(student);
    studentArray.splice(index, 1);
    res.send(student);
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;
