import React, { useReducer } from "react";
import GithubReducer from "./githubReducer";
import GithubContext from "./githubContext";
import axios from "axios";
import {
  USER_SEARCH,
  GET_USER,
  GET_USERS_REPO,
  SET_LOADING,
  CLEAR_USER
} from "../types";

const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
    alert: null,
    repos: []
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  const setLoading = () => dispatch({ type: SET_LOADING });

  const userSearch = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({
      type: USER_SEARCH,
      payload: res.data.items
    });
  };

  const clearUser = () => {
    dispatch({ type: CLEAR_USER });
  };

  const getUser = async login => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({ type: GET_USER, payload: res.data });
  };

  const getUsersRepo = async repos => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${repos}/repos?per_page=5&sort=created:asc&client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`
    );

    dispatch({ type: GET_USERS_REPO, payload: res.data });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        loading: state.loading,
        repos: state.repos,
        alert: state.alert,
        userSearch,
        clearUser,
        getUser,
        getUsersRepo
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
