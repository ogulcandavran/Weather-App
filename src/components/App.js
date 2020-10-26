import React from "react";
import { connect } from "react-redux";

import { searchAction, fetchCurrentApiAction, fetchDaysApiAction, fetchInitialLocationAction } from "../actions";
import Current from "./Current";
import SearchBar from "./SearchBar";

class App extends React.Component {
  componentDidMount() {
    const { fetchInitialLocationAction } = this.props;
    fetchInitialLocationAction();
  }
  handleChange = e => {
    this.props.searchAction(e.target.value);
  };
  handleSearch = e => {
    e.preventDefault();
    const { search, fetchCurrentApiAction, fetchDaysApiAction } = this.props;
    fetchCurrentApiAction(search);
    fetchDaysApiAction(search);
  };

  render() {
    return (
      <div className="body-wrapper">
        <SearchBar onSubmit={e => this.handleSearch(e)} />
        <Current />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    search: state.search,
    currentApiResult: state.currentApiResult
  };
};
export default connect(mapStateToProps, {
  searchAction,
  fetchCurrentApiAction,
  fetchDaysApiAction,
  fetchInitialLocationAction
})(App);