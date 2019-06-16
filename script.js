/*Styles of Engine*/

const SubmitFormStyles = {
    marginTop: "70px",
    display: "flex",
    justifyContent: "center"
};

const boxUsers = {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: "50px",
    maxWidth: "100px",
    padding: "15px"
};

const listOfUsers = {
    display: "flex",
    flexWrap: "wrap"
};

/* GitHub Search Users App */

class UsersList extends React.Component {
    get users() {
        return this.props.users.map(user => <User key={user.id} user={user} />);
    }

    render() {
        return (
            <div style={listOfUsers}>
                {this.users}
            </div>
        )
    };
}

class User extends React.Component {
    render() {
        return (
            <div style={boxUsers}>
                <img src={this.props.user.avatar_url} style={{ maxWidth: "100px", maxHeight: "100px" }} />
                <a href={this.props.user.html_url} target="_blank">{this.props.user.login}</a>
            </div>
        )
    };
}

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            searchText: "",
            users: [],
            error: '',
            initialized: false
        };
    }

    onChangeHandle(event) {
        this.setState({
            searchText: event.target.value
        });
    }

    onSubmit(event) {
        event.preventDefault();
        const { searchText } = this.state;
        const url = `https://api.github.com/search/users?q=${searchText}`;
        fetch(url)
            .then(response => response.json())
            .then(responseJson => this.setState({ users: responseJson.items, error: '', initialized: true }))
            .catch(error => this.setState({ users: [], error: 'Nothing found... Try Again' }))
    };

    render() {
        return (
            <div>
                <form onSubmit={event => this.onSubmit(event)} style={SubmitFormStyles}>
                    <label htmlFor={this.state.searchText} style={{ fontSize: "20px", textTransform: "uppercase" }}>Search by user name:</label>
                    <input
                        type="text"
                        id="searchText"
                        onChange={event => this.onChangeHandle(event)}
                        value={this.state.searchText}
                        style={{ fontSize: "18px", marginLeft: "15px" }} />
                </form>
                <UsersList users={this.state.users} />
                {this.state.error ? <p className="error-message">{this.state.error}</p> : null}
                {/* {this.state.users && this.state.initialized ? <p className="error-message">nothing found...</p> : null} */}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));