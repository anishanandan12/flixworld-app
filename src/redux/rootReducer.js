import { combineReducers } from "redux";

import trendingAllReducer from "./trendingAll/trendingAll.reducer";
import mediaListReducer from "./mediaList/mediaList.reducer";
import genreListReducer from "./genreList/genreList.reducer";
import isLoadingReducer from "./isLoading/isLoading.reducer";

export default combineReducers({
  trendingAll: trendingAllReducer,
  mediaList: mediaListReducer,
  genreList: genreListReducer,
  isLoading: isLoadingReducer,
});
