var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 3000;

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/dist'));
app.use(express.static(__dirname + '/lib'));
app.use(express.static(__dirname + '/src/css'));

var database = {
    animalsId: 1,
    animals: []
};

// Create

app.post('/api/animals', function (req, res) {
    var name = req.body.name;
    var species = req.body.species;

    if (name && species) {
        let animal = {
            id: database.animalsId++,
            name: name,
            species: species
        };
        database.animals.push(animal);
        res.json(animal);
        return;
    }

    res.status(400);
    res.json({ error: 'Name and species are required when creating animals.' });
});

// Read

app.get('/api/animals', function (req, res) {
    res.json(database.animals);
});

app.get('/api/animals/:id', function (req, res) {
    var id = Number(req.params.id);
    var animal = database.animals.find(function (a) {
        return a.id === id;
    });
    if (animal) {
        res.json(animal);
        return;
    }
    res.status(404);
    res.json({ error: 'Animal with that id not found.' });
});

// Update

// Delete

app.listen(port);