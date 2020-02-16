//Items action types
//Get all items from database
export const GET_ITEMS = "GET_ITEMS";
//Add new item into database
export const ADD_ITEM = "ADD_ITEM";
//Edit the amount property of an item
export const EDIT_AMOUNT = "EDIT_AMOUNT";
//Delete an item from database
export const DEL_ITEM = "DEL_ITEM";
//Toggle on while waiting for Promise of fetching data from database to resolve
export const ITEMS_LOADING = "ITEMS_LOADING";

//User authentication action types
//Toggle on while waiting for Promise of authenticating user from database to resolve
export const USER_LOADING = "USER_LOADING";
//Toggle off USER_LOADING if user is authenticated
export const USER_LOADED = "USER_LOADED";
//Authenticate token
export const AUTH_ERROR = "AUTH_ERROR";
//
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";

//Errors action types
export const GET_ERRORS = "GET_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
