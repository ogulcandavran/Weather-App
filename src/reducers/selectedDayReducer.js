export default (state = null, action) => {
  switch (action.type) {
    case "SELECTED_DAY":
      return action.payload;
    default:
      return state;
  }
};