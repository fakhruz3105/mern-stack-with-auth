import axios from "axios";
import {
  GET_ITEMS,
  ADD_ITEM,
  DEL_ITEM,
  EDIT_AMOUNT,
  ITEMS_LOADING
} from "./types";
import { tokenOptions } from "./authActions";
import { returnErrors } from "./errorActions";

export const getItemsAction = () => dispatch => {
  dispatch(setItemsLoadingAction());
  axios.get("/api/items").then(res =>
    dispatch({
      type: GET_ITEMS,
      payload: res.data
    })
  );
};

export const addItemAction = item => (dispatch, getState) => {
  axios
    .post("/api/items/", item, tokenOptions(getState))
    .then(res => {
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      });
    })
    .catch(err => {
      console.log(err);
      dispatch(returnErrors(err.response.message, err.response.status));
    });
};

export const editAmountAction = ({ id, amount }) => (dispatch, getState) => {
  axios
    .put(`/api/items/${id}`, { amount: amount }, tokenOptions(getState))
    .then(res => {
      dispatch({
        type: EDIT_AMOUNT,
        payload: res.data
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const delItemAction = itemId => (dispatch, getState) => {
  axios
    .delete(`/api/items/${itemId}`, tokenOptions(getState))
    .then(res => {
      dispatch({
        type: DEL_ITEM,
        payload: itemId
      });
    })
    .catch(err => {
      dispatch(returnErrors(err.response.data, err.response.status));
    });
};

export const setItemsLoadingAction = () => ({
  type: ITEMS_LOADING
});
