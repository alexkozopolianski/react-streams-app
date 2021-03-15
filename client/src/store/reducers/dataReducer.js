import * as actionTypes from "../actions/types";

const initialState = {
  isLoading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGE:
      return {
        data: action.payload,
        isLoading: true,
      };
    default:
      return state;
  }
};
