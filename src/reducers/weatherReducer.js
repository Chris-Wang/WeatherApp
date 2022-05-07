export default (state = [], action) => {
  switch (action.type) {
    case "FETCH_CITYWEATHER":
      return action.payload;
    default:
      return state;
  }
};
