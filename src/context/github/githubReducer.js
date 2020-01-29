import {
  USER_SEARCH,
  GET_USER,
  GET_USERS_REPO,
  SET_LOADING,
  CLEAR_USER
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case USER_SEARCH:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true
      };
    case CLEAR_USER:
      return {
        ...state,
        users: [],
        loading: false
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case GET_USERS_REPO:
      return {
        ...state,
        repos: action.payload,
        loading: false
      };
    default:
      return {
        ...state
      };
  }
};
