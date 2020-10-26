import React from "react";
import { connect } from "react-redux";
import { searchAction, filteredAction, isSuggestionShowedAction, fetchCurrentApiAction, fetchDaysApiAction, isSearchableAction } from "../actions";

const SearchBar = ({ search, searchAction, filteredAction, isSuggestionShowedAction, filtered, fetchCurrentApiAction, fetchDaysApiAction, isShowed, isSearchableAction, isSearchable }) => {
  const onChange = e => {
    search = e.target.value;
    searchAction(search);
    let filtered = suggestions.filter(suggest => suggest.toLowerCase().indexOf(search.toLowerCase()) !== -1);
    if (filtered.length === 0) {
      filtered = ["Please enter a valid city name."];
      isSearchableAction(false);
    } else {
      isSearchableAction(true);
    }
    filteredAction(filtered);
    isSuggestionShowedAction(true);
  };

  const onClick = e => {
    if (isSearchable) {
      filteredAction([]);
      isSuggestionShowedAction(false);
      searchAction(e.target.innerText);
      fetchCurrentApiAction(e.target.innerText);
      fetchDaysApiAction(e.target.innerText);
    }
  };
  const onKeyDown = e => {
    if (search !== "" && search.length !== 0) {
      if (e.keyCode === 13 && isSearchable) {
        isSuggestionShowedAction(false);
        searchAction(filtered[0]);
        fetchCurrentApiAction(filtered[0]);
        fetchDaysApiAction(filtered[0]);
      }
    }
  };
  let suggestionList;
  if (isShowed && search) {
    suggestionList = (
      <ul>
        {filtered.map(suggest => {
          return (
            <li key={suggest} onClick={e => onClick(e)}>
              {suggest}
            </li>
          );
        })}
      </ul>
    );
  }
  return (
    <div className="header">
      <div className="logo">WEATHER</div>
      <div className="search">
        <input onChange={e => onChange(e)} onKeyDown={e => onKeyDown(e)} value={search} placeholder="Search City" />
        <div className="suggestion">{suggestionList}</div>
      </div>
    </div>
  );
};
const suggestions = ["london", "new york", "rome", "ankara", "istanbul"];

const mapStateToProps = state => {
  return {
    filtered: state.filtered,
    search: state.search,
    isShowed: state.isShowed,
    isSearchable: state.isSearchable
  };
};
export default connect(mapStateToProps, {
  searchAction,
  filteredAction,
  isSuggestionShowedAction,
  fetchCurrentApiAction,
  fetchDaysApiAction,
  isSearchableAction
})(SearchBar);