const INITIAL_STATE = {};

const genreListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_GENRE_LIST":
      return { ...state, ...action.payload };

    default:
      return state;
  }
};

export default genreListReducer;
