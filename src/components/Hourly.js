import React from "react";
import { connect } from "react-redux";
import Loading from "./Loading";

const Hourly = props => {
  const { dailyApiResult, day } = props;
  let dayTemps = [];
  let start = 0;
  let end = 0;
  let dayStart = 0;

  if (dailyApiResult.length !== 0) {
    for (let i = 0; i < 40; i++) {
      let obj = {};
      obj["min"] = dailyApiResult.list[i]["main"]["temp_min"];
      obj["max"] = dailyApiResult.list[i].main.temp_max;
      obj["hour"] = dailyApiResult.list[i].dt_txt.toString().slice(11, 16);
      obj["date"] = dailyApiResult.list[i].dt_txt.toString().slice(0, 10);
      obj["weather"] = dailyApiResult.list[i].weather[0].main.toString().slice(0, 10);
      dayTemps.push(obj);
    }
    const tomorrow = () => {
      let today = new Date();
      today.setDate(today.getDate() + 1);

      const tomorrow = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      return tomorrow;
    };

    dayStart = dayTemps.findIndex(each => {
      return each.date === tomorrow();
    });
  }

  if (day === "second") {
    start = dayStart;
    end = dayStart + 8;
  }
  if (day === "third") {
    start = dayStart + 8;
    end = dayStart + 16;
  }
  if (day === "forth") {
    start = dayStart + 16;
    end = dayStart + 24;
  }
  if (day === "fifth") {
    start = dayStart + 24;
    end = dayStart + 32;
  }

  if (dayTemps.length !== 0) {
    return (
      <div>
        {dayTemps.slice(start, end).map((hour, index) => {
          return (
            <div className="card" key={hour.hour}>
              <div className="clip"></div>
              <div className="card-info">
                <div className="hour">{hour.hour.toString()}</div>
                <div>
                  <img
                    alt="weather icon"
                    src={
                      hour.weather === "Clear"
                        ? "https://img.icons8.com/dotty/80/ffffff/sun.png"
                        : hour.weather === "Clouds"
                        ? "https://img.icons8.com/dotty/80/ffffff/clouds.png"
                        : hour.weather === "Rain"
                        ? "https://img.icons8.com/dotty/80/ffffff/rain.png"
                        : hour.weather === "Snow"
                        ? "https://img.icons8.com/dotty/80/ffffff/winter.png"
                        : "https://img.icons8.com/dotty/80/ffffff/partly-cloudy-day.png"
                    }
                  />
                  <div className="description">{hour.weather === "Clear" ? "Sunny" : hour.weather === "Clouds" ? "Clouds" : hour.weather === "Rain" ? "Rainy" : hour.weather === "Snow" ? "Snow" : "Clear"}</div>
                </div>
                <div className="temperature">
                  {Math.floor(hour.max)}°C / {Math.floor(hour.min)}°C
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
  return <Loading />;
};

const mapStateToProps = state => {
  return { dailyApiResult: state.dailyApiResult };
};
export default connect(mapStateToProps, null)(Hourly);