export default (state = [], action) => {
  switch (action.type) {
    case "ACTIVE_SUGGESTION":
      return action.payload;
    default:
      return state;
  }
};