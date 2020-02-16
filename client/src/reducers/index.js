import { combineReducers } from "redux";
import item from "./itemReducer";
import auth from "./authReducer";
import error from "./errorReducer";

export default combineReducers({
  item,
  auth,
  error
});
