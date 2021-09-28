const INITIAL_STATE = false;

const isLoadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "LOADER_SHOW":
      return true;

    case "LOADER_HIDE":
      return false;

    default:
      return state;
  }
};

export default isLoadingReducer;
