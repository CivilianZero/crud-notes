var lowdb = require('lowdb');
var shortid = require('shortid');
var express = require('express');
var bodyParser = require('body-parser');

var db = lowdb('db.json', { storage: require('lowdb/lib/file-async') });
var app = express();
var port = 3000;

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/src/css'));


db.defaults({
    animals: []
}).value();

// Create

app.post('/api/animals', function (req, res) {
    var name = req.body.name;
    var species = req.body.species;

    if (name && species) {
        let animal = {
            id: shortid(),
            name: name,
            species: species
        };
        db.get('animals').push(animal).value();
        res.json(animal);
        return;
    }

    res.status(400);
    res.json({ error: 'Name and species are required when creating animals.' });
});

// Read

app.get('/api/animals', function (req, res) {
    res.json(db.get('animals').value());
});

app.get('/api/animals/:id', function (req, res) {
    var id = req.params.id;
    var animal = db.get('animals').find({ id: id }).value();
    if (animal) {
        res.json(animal);
        return;
    }
    res.status(404);
    res.json({ error: 'Animal with that id not found.' });
});

// Update
app.put('/api/animals/:id', function (req, res) {
    var id = req.params.id;
    var animal = db.get('animals').find({ id: id });
    var name = req.body.name;
    var species = req.body.species;
    if (animal.value()) {
        animal = animal.assign({
            name: name,
            species: species
        }).value();
        res.json(animal);
        return
    }
    res.status(404);
    res.json({error: 'Animal with that ID not found.'});
});

// Delete
app.delete('/api/animals/:id', function (req, res) {
    var id = req.params.id;
    var animal = db.get('animals').find({ id: id });
    if (animal.value()) {
        db.get('animals').remove({ id: id }).value();
        res.sendStatus(200);
        return;
    }
    res.status(404);
    res.json({error: 'Animal with that ID not found.'});
});

app.listen(port);