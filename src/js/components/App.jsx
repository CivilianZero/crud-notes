var React = require('react');

var Navigation = require('./Navigation.jsx');

var App = React.createClass({
	render: function () {
		return (
			<div className="App">
				<header>
					<Navigation />
				</header>
				<main>
					<h1>App</h1>
					{this.props.children}
				</main>
			</div>
		);
	}
});

module.exports = App;