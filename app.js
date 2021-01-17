'use strict';

const {v4} = require('uuid'),
    path = require('path');

let contacts = [];

module.exports = app => {

    app.get('/api/contacts', (req, res) => {
        res.status(200).json(contacts);
    });

    // TODO IMPLEMENT SERVER VALIDATION

    app.post('/api/contacts', (req, res) => {
        const contact = {...req.body, id: v4(), marked: false};
        contacts.push(contact);
        res.status(201).json(contact);
    });

    app.delete('/api/contacts/:id', (req, res) => {
        contacts = contacts.filter(c => c.id !== req.params.id);
        res.status(200).json({message: 'Contact has been delete'});
    });

    app.put('/api/contacts/:id', (req, res) => {
        const ind = contacts.findIndex(c => c.id === req.params.id);
        contacts[ind] = req.body;
        res.status(200).json(contacts[ind]);
    });

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
    });

    return app;

}

