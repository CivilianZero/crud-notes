var React = require('react');
var ReactDOM = require('react-dom');
var ReactRouter = require('react-router');

var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;
var hashHistory = ReactRouter.hashHistory;

var App = require('./components/App.jsx');
var Animals = require('./components/Animals.jsx');
var Animal = require('./components/Animal.jsx');

var jsx = (
	<Router history={hashHistory}>
		<Route path="/" component={App}>
            <Route path="animals" component={Animals} />
            <Route path="animals/:id" component={Animal} />
        </Route>
	</Router>
);

ReactDOM.render(jsx, document.querySelector('#app'));