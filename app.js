const express = require("express");
const {v4} = require("uuid");
const cors = require("cors");
const path = require("path");
const app = express();

let contacts = [
    {
        id: v4(),
        name: "Sasha Shulga",
        value: "+380500571658",
        marked: false
    }
];

app.use(express.json());
app.use(cors());

//GET
app.get("/api/contacts", (req, res) => {
    res.status(200).json(contacts);
});

//POST
app.post("/api/contacts", (req, res) => {
    const contact = {...req.body, id: v4(), marked: false}; // need implemented server validation
    contacts.push(contact)
    res.status(201).json(contact)
});

//DELETE
app.delete("/api/contacts/:id", (req, res) => {
    contacts = contacts.filter(c => c.id !== req.params.id);
    res.status(200).json({message: "Контакт был удален"});
});

//PUT
app.put("/api/contacts/:id", (req, res) => {
    const ind = contacts.findIndex(c => c.id === req.params.id);
    contacts[ind] = req.body;
    res.status(200).json(contacts[ind])
});

app.use(express.static(path.resolve(__dirname, "client")));

app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "index.html"))
});

app.listen(3000, () => console.log("SERVER HAS BEEN STARTED ON PORT 3000..."));