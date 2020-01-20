import React, { Fragment, Component } from "react";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import User from "./components/users/User";
import Users from "./components/users/Users";
import Search from "./components/users/Search";
import Alert from "./components/layouts/Alert";
import About from "./components/pages/About";

// import UsersItem from "./components/users/UsersItem";

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null
  };

  alert = (msg, text) => {
    this.setState({ alert: { msg, text } });
    setTimeout(() => {
      this.setState({ alert: null });
    }, 3000);
  };

  clearUser = () => {
    this.setState({ users: [], loading: false });
  };

  getUser = async login => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    this.setState({ loading: false, user: res.data });
  };

  getUsersRepo = async repos => {
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/users/${repos}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    this.setState({ repos: res.data, loading: false });
  };

  userSearch = async text => {
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    this.setState({ loading: true });
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    this.setState({ users: res.data.items, loading: false });
  };

  // async componentDidMount() {
  //   // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
  //   this.setState({ loading: true });
  //   const res = await axios.get(
  //     `https://api.github.com/users?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
  //   );
  //   console.log(res.data);
  //   this.setState({ users: res.data, loading: false });
  // }

  render() {
    const { loading, users, user, repos } = this.state;
    return (
      <Router>
        <div className='App'>
          <Navbar />
          <div className='container'>
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
                exact
                path='/'
                render={props => (
                  <Fragment>
                    <Search
                      userSearch={this.userSearch}
                      clearUser={this.clearUser}
                      showClearBtn={users.length > 0 ? true : false}
                      alert={this.alert}
                    />

                    <Users loading={loading} users={users} />
                  </Fragment>
                )}
              ></Route>

              <Route exact path='/about' component={About}></Route>
              <Route
                exact
                path='/user/:login'
                render={props => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUsersRepo={this.getUsersRepo}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              ></Route>
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
