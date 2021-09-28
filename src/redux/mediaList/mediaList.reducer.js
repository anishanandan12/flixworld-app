const INITIAL_STATE = {
  movie: [],
  tv: [],
};

const mediaListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_MOVIE_LIST":
      return { ...state, movie: [...state.movie, action.payload] };

    case "UPDATE_TV_LIST":
      return { ...state, tv: [...state.movie, action.payload] };

    default:
      return state;
  }
};

export default mediaListReducer;
