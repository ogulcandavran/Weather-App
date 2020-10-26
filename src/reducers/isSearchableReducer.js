export default (state = true, action) => {
  switch (action.type) {
    case "IS_SEARCHABLE":
      return action.payload;
    default:
      return state;
  }
};