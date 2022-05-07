import hazeMri from "../media/cloudy.jpg";
import hazeAft from "../media/cloudy_afternoon.jpg";
import hazeNite from "../media/cloudy_night.jpg";
import sunnyMri from "../media/sunny.jpg";
import sunnyAft from "../media/sunny_afternoon.jpg";
import sunnyNite from "../media/sunny_night.jpg";
import rainyMri from "../media/rainy.jpg";
import rainyAft from "../media/rainy_afternoon.jpg";
import rainyNite from "../media/rainy_night.jpg";
import Moment from "moment-timezone";

const convertKtoC = (data) => {
  return Math.round(data - 273.15);
};

const convertDayPart = (date) => {
  if (date >= 7 && date < 13) return "morning";
  if (date >= 13 && date < 18) return "afternoon";
  return "evening";
};

export const formatResponse = (name, data) => {
  const result = {};
  result.city = name;
  result.time = data.current.dt;
  result.dayPart = convertDayPart(
    Moment.tz(Moment(), data.timezone).format("k")
  );
  // result.date
  result.date = Moment.tz(Moment(), data.timezone).format("MMM Do dddd");
  result.timezone = data.timezone;
  result.feelLike = convertKtoC(data.current.feels_like);
  result.main = data.current.weather[0].main;
  result.description = data.current.weather[0].description;
  result.highTemp = convertKtoC(data.daily[0].temp.max);
  result.lowTemp = convertKtoC(data.daily[0].temp.min);
  result.sunRise = Moment.tz(
    Moment(data.current.sunrise * 1000),
    data.timezone
  ).format("hh:mm A");

  result.sunSet = Moment.tz(
    Moment(data.current.sunset * 1000),
    data.timezone
  ).format("hh:mm A");
  result.humidity = data.current.humidity;
  result.wind = data.current.wind_speed;
  result.forecast = data.daily.map((d) => {
    return {
      day: Moment.tz(Moment(d.dt * 1000), data.timezone).format("ddd"),
      weather: d.weather[0].main,
      temp: convertKtoC(d.temp.day),
    };
  });
  result.forecast.pop();
  return result;
};

export const renderBackground = (main, day) => {
  switch (main) {
    case "Haze":
      switch (day) {
        case "morning":
          return {
            background: `url(${hazeMri}) center center / cover`,
          };
        case "afternoon":
          return {
            background: `url(${hazeAft}) center center / cover`,
          };
        case "evening":
          return {
            background: `url(${hazeNite}) center center / cover`,
          };
        default:
          return {
            background: `url(${hazeMri}) center center / cover`,
          };
      }
    case "Clouds":
      switch (day) {
        case "morning":
          return {
            background: `url(${hazeMri}) center center / cover`,
          };
        case "afternoon":
          return {
            background: `url(${hazeAft}) center center / cover`,
          };
        case "evening":
          return {
            background: `url(${hazeNite}) center center / cover`,
          };
        default:
          return {
            background: `url(${hazeMri}) center center / cover`,
          };
      }
    case "Clear":
      switch (day) {
        case "morning":
          return {
            background: `url(${sunnyMri}) center center / cover`,
          };
        case "afternoon":
          return {
            background: `url(${sunnyAft}) center center / cover`,
          };
        case "evening":
          return {
            background: `url(${sunnyNite}) center center / cover`,
          };
        default:
          return {
            background: `url(${sunnyMri}) center center / cover`,
          };
      }

    case "Rain":
      switch (day) {
        case "morning":
          return {
            background: `url(${rainyMri}) center center / cover`,
          };
        case "afternoon":
          return {
            background: `url(${rainyAft}) center center / cover`,
          };
        case "evening":
          return {
            background: `url(${rainyNite}) center center / cover`,
          };
        default:
          return {
            background: `url(${rainyMri}) center center / cover`,
          };
      }
    default:
      return {
        background: `url(${sunnyMri}) center center / cover`,
      };
  }
};
