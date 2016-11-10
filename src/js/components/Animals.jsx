var React = require('react');
var Link = require('react-router').Link;

var Animal = require('./Animal.jsx');
var animalStore = require('../stores/animalStore');

var Animals = React.createClass({

    getInitialState: function () {
        return {
            animals: animalStore.fetch(),
            newAnimalNameValue: '',
            newAnimalSpeciesValue: ''
        };
    },

    componentWillMount: function () {
        animalStore.on('update', this.handleStoreChange);
    },

    // Don't forget to remove your event handlers!
    componentWillUnmount: function () {
        animalStore.off('update', this.handleStoreChange);
    },

    render: function () {
        var links = this.state.animals.map(function (a) {
            return (
                <li key={a.id}>
                    <Link to={'/animals/' + a.id}>{a.name}</Link>
                </li>
            );
        });
        return (
            <div className="Animals">
                <ul>{links}</ul>
                <input
                    type="text"
                    value={this.state.newAnimalNameValue}
                    onChange={this.handleNewAnimalNameChange}
                    />
                <input
                    type="text"
                    value={this.state.newAnimalSpeciesValue}
                    onChange={this.handleNewAnimalSpeciesChange}
                    />
                <button onClick={this.handleCreateClick}>Create</button>
            </div>
        );
    },

    handleStoreChange: function () {
        this.setState({
            animals: animalStore.get()
        });
    },

    handleNewAnimalNameChange: function (e) {
        this.setState({
            newAnimalNameValue: e.target.value
        });
    },

    handleNewAnimalSpeciesChange: function (e) {
        this.setState({
            newAnimalSpeciesValue: e.target.value
        });
    },

    handleCreateClick: function () {
        animalStore.add(this.state.newAnimalNameValue, this.state.newAnimalSpeciesValue);
        this.setState({
            newAnimalNameValue: '',
            newAnimalSpeciesValue: ''
        });
    }

});

module.exports = Animals;