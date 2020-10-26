import { SEARCH, SELECTED_DAY, CURRENT_API_RESULTS, DAYS_API_RESULTS, ACTIVE_SUGGESTION, FILTERED, IS_SHOWN, IS_SEARCHABLE } from "./types";

export const fetchCurrentApiAction = (search, lat, long) => async dispatch => {
  const apiKey = "3175d8baf0954cc1bca47d0faa84f6c2";
  let url;
  search ? (url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&APPID=${apiKey}&units=metric`) : (url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&APPID=${apiKey}&units=metric`);
  await fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch(apiResults(res));
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchDaysApiAction = (search, lat, long) => async dispatch => {
  const apiKey = "3175d8baf0954cc1bca47d0faa84f6c2";
  let url;
  search ? (url = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&APPID=${apiKey}&units=metric`) : (url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&APPID=${apiKey}&units=metric`);
  await fetch(url)
    .then(res => res.json())
    .then(res => {
      dispatch(daysApiResults(res));
    })
    .catch(err => console.log(err));
};
export const fetchInitialLocationAction = () => async dispatch => {
  await fetch("https://ipapi.co/json")
    .then(res => res.json())
    .then(res => {
      dispatch(fetchCurrentApiAction(null, res.latitude, res.longitude));
      dispatch(fetchDaysApiAction(null, res.latitude, res.longitude));
    })
    .catch(() => {
      dispatch(fetchCurrentApiAction("London"));
      dispatch(fetchDaysApiAction("London"));
    });
};
export const apiResults = result => {
  return {
    type: CURRENT_API_RESULTS,
    payload: result
  };
};

export const daysApiResults = result => {
  return {
    type: DAYS_API_RESULTS,
    payload: result
  };
};

export const searchAction = value => {
  return {
    type: SEARCH,
    payload: value
  };
};

export const activeSuggestionAction = value => {
  return {
    type: ACTIVE_SUGGESTION,
    payload: value
  };
};

export const filteredAction = value => {
  return {
    type: FILTERED,
    payload: value
  };
};

export const isSuggestionShowedAction = value => {
  return {
    type: IS_SHOWN,
    payload: value
  };
};
export const isSearchableAction = value => {
  return {
    type: IS_SEARCHABLE,
    payload: value
  };
};
export const selectedDayAction = value => {
  return {
    type: SELECTED_DAY,
    payload: value
  };
};