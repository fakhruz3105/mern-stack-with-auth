import axios from "axios";
import { returnErrors } from "./errorActions";
import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL
} from "../actions/types";

//Get user action
export const getUserAction = () => (dispatch, getState) => {
  dispatch({
    type: USER_LOADING
  });

  //Verified token at backend
  axios
    .get("/api/users", tokenOptions(getState))
    .then(res =>
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
      dispatch({
        type: AUTH_ERROR
      });
    });
};

//Register user action
export const registerUserAction = user => dispatch => {
  axios
    .post("/api/users/register", user)
    .then(res =>
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "REGISTER_FAIL")
      );
      dispatch({
        type: REGISTER_FAIL
      });
    });
};

//Login user action
export const loginUserAction = user => dispatch => {
  axios
    .post("/api/users/login", user)
    .then(res =>
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
    )
    .catch(err => {
      dispatch(
        returnErrors(err.response.data, err.response.status, "LOGIN_FAIL")
      );
      dispatch({
        type: LOGIN_FAIL
      });
    });
};

//Logout user action
export const logoutAction = () => ({
  type: LOGOUT_SUCCESS
});

export const tokenOptions = getState => {
  //Get token from localStorage
  const token = getState().auth.token;

  //Header
  const options = {
    headers: {
      "Content-type": "application/json"
    }
  };

  //If token exist, add to header
  if (token) {
    options.headers["x-auth-token"] = token;
  }

  return options;
};
