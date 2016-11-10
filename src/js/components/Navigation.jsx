var React = require('react');
var Link = require('react-router').Link;

function getActiveClass (path) {
    var current = window.location.hash.slice(1);
    return current === path ? 'active' : '';
}

// Note that a React component can be a function that returns JSX, or a complete
// React "class" (using React.createClass)
module.exports = function () {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/" className={ getActiveClass('/') }>Home</Link>
                </li>
                <li>
                    <Link to="/animals" className={ getActiveClass('/animals') }>Animals</Link>
                </li>
            </ul>
        </nav>
    );
};