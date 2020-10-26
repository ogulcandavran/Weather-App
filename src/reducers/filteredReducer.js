export default (state = [], action) => {
  switch (action.type) {
    case "FILTERED":
      return action.payload;
    default:
      return state;
  }
};
