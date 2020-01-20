import React, { Fragment, useState } from "react";
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

const App = () => {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState(null);

  const showAlert = (msg, text) => {
    setAlert( { msg, text } );
    setTimeout(() => {
      setAlert(null);
    }, 3000);
  };

  const clearUser = () => {
    setUsers([]);
    setLoading(false);
  };

  const getUser = async login => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setUser(res.data)
    
  };

  const getUsersRepo = async repos => {
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${repos}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    setLoading(false);
    setRepos(res.data)
    
  };

  const userSearch = async text => {
    // console.log(process.env.REACT_APP_GITHUB_CLIENT_ID)
    setLoading(true);
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );
    console.log(res.data);
    setLoading(false);
    setUsers(res.data.items) 
    
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

  return (
    <Router>
      <div className='App'>
        <Navbar />
        <div className='container'>
          <Alert alert={alert} />
          <Switch>
            <Route
              exact
              path='/'
              render={props => (
                <Fragment>
                  <Search
                    userSearch={userSearch}
                    clearUser={clearUser}
                    showClearBtn={users.length > 0 ? true : false}
                    showAlert={showAlert}
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
                  getUser={getUser}
                  getUsersRepo={getUsersRepo}
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
};

export default App;
