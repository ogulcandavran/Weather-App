import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading";
import Error from "./Error";
import Daily from "./Daily";

const Current = props => {
  if (props.currentApiResult.length === 0) {
    return <Loading />;
  }
  if (props.currentApiResult.cod === 200) {
    return (
      <div className="content-wrapper">
        <div className="current">
          <div className="current-temp">
            <p>
              <span>{parseInt(props.currentApiResult.main.temp, 10)}</span>
              <span className="celcius">°C</span>
            </p>
          </div>

          <div className="current-detail">
            <p className="city">
              {props.currentApiResult.name},{props.currentApiResult.sys.country}
            </p>

            <p className="description">{props.currentApiResult.weather[0].description}</p>

            <p className="temperature">{props.currentApiResult.main.temp_min.toString().split(".")[0] + "°C / " + 
            props.currentApiResult.main.temp_max.toString().split(".")[0] + "°C"}</p>
          </div>
        </div>
        <Daily />
      </div>
    );
  }
  return <Error />;
};
const mapStateToProps = state => {
  return {
    currentApiResult: state.currentApiResult
  };
};
export default connect(mapStateToProps, null)(Current);