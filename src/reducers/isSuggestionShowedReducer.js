export default (state = false, action) => {
  switch (action.type) {
    case "IS_SHOWN":
      return action.payload;
    default:
      return state;
  }
};