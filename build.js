"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/*Styles of Engine*/

var SubmitFormStyles = {
    marginTop: "70px",
    display: "flex",
    justifyContent: "center"
};

var boxUsers = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "50px",
    maxWidth: "100px",
    padding: "15px"
};

var listOfUsers = {
    display: "flex",
    flexWrap: "wrap"
};

/* GitHub Search Users App */

var App = function (_React$Component) {
    _inherits(App, _React$Component);

    function App() {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

        _this.state = {
            searchText: "",
            users: [],
            error: '',
            initialized: false
        };
        return _this;
    }

    _createClass(App, [{
        key: "onChangeHandle",
        value: function onChangeHandle(event) {
            this.setState({
                searchText: event.target.value
            });
        }
    }, {
        key: "onSubmit",
        value: function onSubmit(event) {
            var _this2 = this;

            console.log('rendering...', this.state);
            event.preventDefault();
            var searchText = this.state.searchText;

            var url = "https://api.github.com/search/users?q=" + searchText;
            fetch(url).then(function (response) {
                return response.json();
            }).then(function (responseJson) {
                return _this2.setState({ users: responseJson.items, error: '', initialized: true });
            }).catch(function (error) {
                return _this2.setState({ users: [], error: 'ERROR Try again later...', initialized: false });
            });
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                null,
                React.createElement(
                    "form",
                    { onSubmit: function onSubmit(event) {
                            return _this3.onSubmit(event);
                        }, style: SubmitFormStyles },
                    React.createElement(
                        "label",
                        { htmlFor: this.state.searchText, style: { fontSize: "20px", textTransform: "uppercase" } },
                        "Search by user name:"
                    ),
                    React.createElement("input", {
                        type: "text",
                        id: "searchText",
                        onChange: function onChange(event) {
                            return _this3.onChangeHandle(event);
                        },
                        value: this.state.searchText,
                        style: { fontSize: "18px", marginLeft: "15px" } })
                ),
                React.createElement(UsersList, { users: this.state.users }),
                this.state.error ? React.createElement(
                    "p",
                    { className: "error-message" },
                    this.state.error
                ) : null,
                !this.state.users.length && this.state.initialized ? React.createElement(
                    "p",
                    { className: "error-message" },
                    "We Can't Find This User"
                ) : null
            );
        }
    }]);

    return App;
}(React.Component);

var UsersList = function (_React$Component2) {
    _inherits(UsersList, _React$Component2);

    function UsersList() {
        _classCallCheck(this, UsersList);

        return _possibleConstructorReturn(this, (UsersList.__proto__ || Object.getPrototypeOf(UsersList)).apply(this, arguments));
    }

    _createClass(UsersList, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: listOfUsers },
                this.users
            );
        }
    }, {
        key: "users",
        get: function get() {
            return this.props.users.map(function (user) {
                return React.createElement(User, { key: user.id, user: user });
            });
        }
    }]);

    return UsersList;
}(React.Component);

var User = function (_React$Component3) {
    _inherits(User, _React$Component3);

    function User() {
        _classCallCheck(this, User);

        return _possibleConstructorReturn(this, (User.__proto__ || Object.getPrototypeOf(User)).apply(this, arguments));
    }

    _createClass(User, [{
        key: "render",
        value: function render() {
            return React.createElement(
                "div",
                { style: boxUsers },
                React.createElement("img", { src: this.props.user.avatar_url, style: { maxWidth: "100px", maxHeight: "100px" } }),
                React.createElement(
                    "a",
                    { href: this.props.user.html_url, target: "_blank" },
                    this.props.user.login
                )
            );
        }
    }]);

    return User;
}(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById("root"));
