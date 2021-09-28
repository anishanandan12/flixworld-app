const INITIAL_STATE = null;

const trendingAllReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "GET_TRENDING_ALL":
      return action.payload;
    default:
      return state;
  }
};

export default trendingAllReducer;
