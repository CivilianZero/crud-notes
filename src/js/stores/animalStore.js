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
                }
                store.emit('update');
            }
        });
        return null;
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

}

function edit (id, name, species) {

}

store.fetch = fetch;
store.add = add;
store.get = get;
store.delete = del;
store.edit = edit;

module.exports = store;