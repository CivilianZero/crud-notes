var React = require('react');

var Animal = require('./Animal.jsx');
var animalStore = require('../stores/animalStore');

var Animals = React.createClass({

    getInitialState: function () {
        var animalId = Number(this.props.params.id);
        return {
            animalId: animalId,
            animal: animalStore.fetch(animalId),
            editing: false,
            editingNameValue: '',
            editingSpeciesValue: ''
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
        var animal = this.state.animal;
        var content;
        if (animal) {
            if (this.state.editing) {
                content = (
                    <div className="Animal-details">
                        <dl>
                            <dt>Name:</dt>
                            <dd>
                                <input
                                    type="text"
                                    value={this.state.editingNameValue}
                                    onChange={this.handleEditingNameChange}
                                    />
                            </dd>
                            <dt>Species:</dt>
                            <dd>
                                <input
                                    type="text"
                                    value={this.state.editingSpeciesValue}
                                    onChange={this.handleEditingSpeciesChange}
                                    />
                            </dd>
                        </dl>
                        <button onClick={this.handleSaveClick}>Save</button>
                    </div>
                );
            } else {
                content = (
                    <div className="Animal-details">
                        <dl>
                            <dt>Name:</dt>
                            <dd>{animal.name}</dd>
                            <dt>Species:</dt>
                            <dd>{animal.species}</dd>
                        </dl>
                        <button onClick={this.handleEditClick}>Edit</button>
                        <button onClick={this.handleDeleteClick}>Delete</button>
                    </div>
                );
            }
        } else {
            content = 'Loading...';
        }
        return <div className="Animal">{content}</div>;
    },

    handleStoreChange: function () {
        var animal = animalStore.get(this.state.animalId);
        this.setState({
            animal: animal,
            editingNameValue: animal ? animal.name : '',
            editingSpeciesValue: animal ? animal.species : ''
        });
    },

    handleEditClick: function () {
        this.setState({
            editing: true
        });
    },

    handleEditingNameChange: function (e) {
        this.setState({
            editingNameValue: e.target.value
        });
    },

    handleEditingSpeciesChange: function (e) {
        this.setState({
            editingSpeciesValue: e.target.value
        });
    },

    handleSaveClick: function () {

    },

    handleDeleteClick: function () {

    }

});

module.exports = Animals;