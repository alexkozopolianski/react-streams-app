import * as actionTypes from '../actions/types';



export default (state = {}, action) => {
    switch (action.type) {
      case actionTypes.FETCH_CHANNEL:
        return action.payload;
      default:
        return state;
    }
  };