import {
  GET_ITEMS,
  ADD_ITEM,
  EDIT_AMOUNT,
  DEL_ITEM,
  ITEMS_LOADING
} from "../actions/types";

const initialState = {
  items: [],
  loading: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ITEMS:
      return {
        ...state,
        items: payload,
        loading: false
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [payload, ...state.items]
      };
    case DEL_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== payload)
      };
    case EDIT_AMOUNT:
      return {
        ...state,
        items: state.items.map(item => {
          if (item._id === payload._id) {
            return payload;
          }
          return item;
        })
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
};
