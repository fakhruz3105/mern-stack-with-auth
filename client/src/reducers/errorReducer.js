import { GET_ERRORS, CLEAR_ERRORS } from "../actions/types";

const initialState = {
  message: {},
  status: null,
  id: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ERRORS:
      return {
        message: payload.message,
        status: payload.status,
        id: payload.id
      };
    case CLEAR_ERRORS:
      return {
        message: {},
        status: null,
        id: null
      };
    default:
      return state;
  }
};
