import "./WeatherCard.css";
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import history from "../../../utils/history";
import { renderBackground } from "../../../utils";
import hazeIcon from "../../../media/wi-day-haze.svg";
import rainIcon from "../../../media/wi-day-rain.svg";
import sunnyIcon from "../../../media/wi-day-sunny.svg";
import cloudyIcon from "../../../media/wi-day-cloudy.svg";

class WeatherCard extends React.Component {
  renderCities = () => {
    return this.props.cities.map((city) => {
      return (
        <Link
          to={`/city/${city.city}`}
          className="weatherCard-cities-item"
          key={city.identifier}
        >
          {city.city}
        </Link>
      );
    });
  };

  renderForecast = () => {
    if (!this.props.weather.forecast) {
      return null;
    } else {
      return this.props.weather.forecast.map((item) => {
        return (
          <span className="weatherCard-forecast-item" key={item.day}>
            <p className="weatherCard-forecast-day">{item.day}</p>
            <div
              className="weatherCard-forecast-icon"
              style={this.renderIcons(item.weather)}
            ></div>
            <p className="weatherCard-forecast-temp">{`${item.temp}°`}</p>
          </span>
        );
      });
    }
  };

  renderIcons = (main) => {
    switch (main) {
      case "Haze":
        return {
          background: `url(${hazeIcon}) no-repeat center`,
        };
      case "Rain":
        return {
          background: `url(${rainIcon}) no-repeat center `,
        };
      case "Clouds":
        return {
          background: `url(${cloudyIcon}) no-repeat center `,
        };
      default:
        return {
          background: `url(${sunnyIcon}) no-repeat center `,
        };
    }
  };

  render() {
    const { weather } = this.props;
    if (!weather) {
      return null;
    }
    return (
      <div
        className="weatherCard"
        style={renderBackground(weather.main, weather.dayPart)}
      >
        <div className="weatherCard-view">
          <div className="weatherCard-toolbar">
            <span className="weatherCard-search">Search</span>
            <span className="weatherCard-cities">{this.renderCities()}</span>
          </div>
          <div className="weatherCard-info">
            <h3 className="weatherCard-date">{weather.date}</h3>
            <h2 className="weatherCard-brief">{weather.main}</h2>
          </div>
        </div>
        <div className="weatherCard-stats">
          <div className="weatherCard-city">
            <div
              className="weatherCard-icon"
              style={this.renderIcons(weather.main)}
            ></div>
            <div className="weatherCard-cityInfo">
              <h1 className="weatherCard-cityTitle">{weather.city}</h1>
              <p className="weatherCard-cityWeather">
                {`Feels like ${weather.feelLike}°C. ${weather.description}.`}
              </p>
            </div>
          </div>
          <div className="weatherCard-forecast">
            <div className="weatherCard-forecastBoard">
              {this.renderForecast()}
            </div>
          </div>
          <div className="weatherCard-details">
            <div className="weatherCard-tempDetails">
              <div className="weatherCard-tempTitle">TEMPERATURE</div>
              <div className="weatherCard-temp-item">
                <div className="weatherCard-icon-feel"></div>
                <span className="weatherCard-temp-smlLabel">Feels like: </span>
                <span className="weatherCard-temp-label">{`${weather.feelLike}°C`}</span>
              </div>
              <div className="weatherCard-temp-item">
                <div className="weatherCard-icon-tempMax"></div>
                <span className="weatherCard-temp-smlLabel">High: </span>
                <span className="weatherCard-temp-label">{`${weather.highTemp}°C`}</span>
              </div>
              <div className="weatherCard-temp-item">
                <div className="weatherCard-icon-tempMin"></div>
                <span className="weatherCard-temp-smlLabel">Low: </span>
                <span className="weatherCard-temp-label">{`${weather.lowTemp}°C`}</span>
              </div>
            </div>
            <div className="weatherCard-sunDetails">
              <div className="weatherCard-sunTitle">SUNRISE & SUNSET</div>
              <div className="weatherCard-sun-item">
                <div className="weatherCard-icon-sunRise"></div>
                <span className="weatherCard-sun-label">{weather.sunRise}</span>
              </div>
              <div className="weatherCard-sun-item">
                <div className="weatherCard-icon-sunSet"></div>
                <span className="weatherCard-sun-label">{weather.sunSet}</span>
              </div>
            </div>
            <div className="weatherCard-humidity">
              <span className="weatherCard-humidity-smlLabel">Humidity</span>
              <span className="weatherCard-humidity-label">
                {weather.humidity}
              </span>
              <div className="weatherCard-icon-humidity"></div>
            </div>
            <div className="weatherCard-wind">
              <div className="weatherCard-icon-wind"></div>
              <span className="weatherCard-wind-smlLabel">Wind Status</span>
              <span className="weatherCard-wind-label">{weather.wind}</span>
              <span className="weatherCard-wind-unit">m/s</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { weather: state.weather };
};
export default connect(mapStateToProps, {})(WeatherCard);
