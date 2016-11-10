var $ = require('jquery');
var EventEmitter = require('eventemitter3');

var store = Object.create(EventEmitter.prototype);
EventEmitter.call(store);

var resourceRoot = '/api/animals/';
var animals = [];

function findById (id) {
    return animals.find(function (a) {
        return a.id === id;
    });
}

function get (id) {
    if (id) {
        return findById(id);
    } else {
        return animals;
    }
}

function fetch (id) {
    if (id) {
        $.ajax({
            url: resourceRoot + id,
            success: function (response) {
                var existing = findById(response.id);
                if (!existing) {
                    animals.push(response);
                } else {
                    // Will splice the existing object and insert the new one
                    // from the server.
                    animals.splice(animals.indexOf(existing), 1, response);
                }
                store.emit('update');
            }
        });
        return findById(id);
    } else {
        $.ajax({
            url: resourceRoot,
            success: function (response) {
                animals = response;
                store.emit('update');
            }
        });
        return animals;
    }
}

function add (name, species) {
    if (name && species) {
        $.ajax({
            url: resourceRoot,
            method: 'POST',
            data: {
                name: name,
                species: species
            },
            success: function (response) {
                animals.push(response);
                store.emit('update');
            }
        });
    }
}

function del (id) {
    var animal = findById(id);
    if (animal) {
        $.ajax({
            url: resourceRoot + id,
            method: 'DELETE',
            success: function() {
                animals.splice(animals.indexOf(animal), 1);
                store.emit('update');
            }
        });
    }
}

function edit (id, name, species) {
    var animal = findById(id);
    if (animal) {
        $.ajax({
            url: resourceRoot + id,
            method: 'PUT',
            data: {
                name: name,
                species: species
            },
            success: function(response) {
                animals.splice(animals.indexOf(animal), 1, response);
                store.emit('update');
            }
        });
    }
}

store.fetch = fetch;
store.add = add;
store.get = get;
store.delete = del;
store.edit = edit;

module.exports = store;