import { combineReducers } from "redux";
import searchBarReducer from "./searchBarReducer";
import fetchApiReducer from "./fetchApiReducer";
import fetchDailyApiReducer from "./fetchDailyApiReducer";
import activeSuggestionReducer from "./activeSuggestionReducer";
import filteredReducer from "./filteredReducer";
import isSuggestionShowedReducer from "./isSuggestionShowedReducer";
import isSearchableReducer from "./isSearchableReducer";
import selectedDayReducer from "./selectedDayReducer";

export default combineReducers({
  search: searchBarReducer,
  currentApiResult: fetchApiReducer,
  dailyApiResult: fetchDailyApiReducer,
  activeSuggestion: activeSuggestionReducer,
  filtered: filteredReducer,
  isShowed: isSuggestionShowedReducer,
  isSearchable: isSearchableReducer,
  selectedDay: selectedDayReducer
});