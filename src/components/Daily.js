import React from "react";
import { connect } from "react-redux";
import Hourly from "./Hourly";
import { selectedDayAction } from "../actions";
import Loading from "./Loading";

const Daily = props => {
  const { dailyApiResult, selectedDay, selectedDayAction } = props;

  let dailyResultChunks = [];
  let daysAverage = [];
  let dayStart = 0;

  if (dailyApiResult.length !== 0) {
    const tomorrow = () => {
      let today = new Date();
      today.setDate(today.getDate() + 1);

      const tomorrow = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      return tomorrow;
    };

    dayStart = dailyApiResult.list.findIndex(each => {
      return each["dt_txt"].slice(0, 10) === tomorrow();
    });

    for (let i = dayStart; i < dailyApiResult.list.length; i += 8) {
      dailyResultChunks.push(dailyApiResult.list.slice(i, i + 8));
    }
    let firstDayTemps = [];
    let secondDayTemps = [];
    let thirdDayTemps = [];
    let forthDayTemps = [];
    let fifthDayTemps = [];

    dailyResultChunks[0].map(hour => firstDayTemps.push(hour.main.temp));
    dailyResultChunks[1].map(hour => secondDayTemps.push(hour.main.temp));
    dailyResultChunks[2].map(hour => thirdDayTemps.push(hour.main.temp));
    dailyResultChunks[3].map(hour => forthDayTemps.push(hour.main.temp));
    dailyResultChunks[4].map(hour => fifthDayTemps.push(hour.main.temp));

    daysAverage[0] = firstDayTemps.reduce((total, amount) => total + amount) / 8;
    daysAverage[1] = secondDayTemps.reduce((total, amount) => total + amount) / 8;
    daysAverage[2] = thirdDayTemps.reduce((total, amount) => total + amount) / 8;
    daysAverage[3] = forthDayTemps.reduce((total, amount) => total + amount) / 8;
    daysAverage[4] = fifthDayTemps.reduce((total, amount) => total + amount) / 8;
  }

  let weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function currentDay(num) {
    if (daysAverage.length !== 0) {
      let dateOfWeather = new Date(dailyApiResult["list"][num]["dt_txt"]);
      return weekdays[dateOfWeather.getDay()];
    }
  }

  const showHourly = day => {
    selectedDayAction(day);
  };
  if (daysAverage.length === 0) {
    return <Loading />;
  }

  return (
    <div className="daily">
      <div className="days">
        <div className={selectedDay === "second" || selectedDay === null ? "card active" : "card"} onClick={() => showHourly("second")}>
          <div className="day">{currentDay(8)}</div>
          <div className="day-info">
            <div className="temp">{Math.floor(daysAverage[1])}°C</div>
            <div className="description">{dailyApiResult["list"][dayStart]["weather"][0]["description"]}</div>
          </div>
        </div>
        <div className={selectedDay === "third" ? "card active" : "card"} onClick={() => showHourly("third")}>
          <div className="day">{currentDay(16)}</div>
          <div className="day-info">
            <div className="temp">{Math.floor(daysAverage[2])}°C</div>
            <div className="description">{dailyApiResult["list"][dayStart + 8]["weather"][0]["description"]}</div>
          </div>
        </div>
        <div className={selectedDay === "forth" ? "card active" : "card"} onClick={() => showHourly("forth")}>
          <div className="day">{currentDay(24)}</div>
          <div className="day-info">
            <div className="temp">{Math.floor(daysAverage[3])}°C</div>
            <div className="description">{dailyApiResult["list"][dayStart + 16]["weather"][0]["description"]}</div>
          </div>
        </div>
        <div className={selectedDay === "fifth" ? "card active" : "card"} onClick={() => showHourly("fifth")}>
          <div className="day">{currentDay(32)}</div>
          <div className="day-info">
            <div className="temp">{Math.floor(daysAverage[4])}°C</div>
            <div className="description">{dailyApiResult["list"][dayStart + 24]["weather"][0]["description"]}</div>
          </div>
        </div>
      </div>
      <div className="hourly">{<Hourly day={selectedDay || "second"} />}</div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    dailyApiResult: state.dailyApiResult,
    selectedDay: state.selectedDay
  };
};
export default connect(mapStateToProps, { selectedDayAction })(Daily);