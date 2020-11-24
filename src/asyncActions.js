const redux = require("redux");
const axios = require("axios");
const applyMiddleWare = redux.applyMiddleware;
const createStore = redux.createStore;
const thunkMiddleWare = require("redux-thunk").default;

const initialState = {
  loading: false,
  users: [],
  error: "",
};

//actions

const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";

//actions definations

const fetchRequest = () => {
  return {
    type: FETCH_USERS_REQUEST,
  };
};

const fetchError = (error) => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error,
  };
};

const fetchSuccess = (users) => {
  return {
    type: FETCH_USERS_SUCCESS,
    payload: users,
  };
};

//reducers

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: "",
      };

    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload,
      };
  }
};

const fetchUsers = () => {
  return function (dispatch) {
    dispatch(fetchRequest());
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        const users = response.data.map((user) => user.id);
        dispatch(fetchSuccess(users));
      })
      .catch((e) => {
        dispatch(fetchError(e.message));
      });
  };
};

//store

const store = createStore(reducer, applyMiddleWare(thunkMiddleWare));
store.subscribe(() => console.log(store.getState()));
store.dispatch(fetchUsers());
