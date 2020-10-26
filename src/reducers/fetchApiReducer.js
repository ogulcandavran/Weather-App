import { CURRENT_API_RESULTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case CURRENT_API_RESULTS:
      return action.payload;
    default:
      return state;
  }
};