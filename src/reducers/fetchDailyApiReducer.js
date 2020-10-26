import { DAYS_API_RESULTS } from "../actions/types";

export default (state = [], action) => {
  switch (action.type) {
    case DAYS_API_RESULTS:
      return action.payload;
    default:
      return state;
  }
};