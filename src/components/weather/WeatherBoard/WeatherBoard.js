import "./WeatherBoard.css";
import React from "react";
import { connect } from "react-redux";
import { fetchCityWeather } from "../../../actions";
import WeatherCard from "../WeatherCard";
import { renderBackground } from "../../../utils";

const cities = [
  { city: "Sydney", identifier: "Australia/Sydney" },
  { city: "Seoul", identifier: "Asia/Seoul" },
  { city: "London", identifier: "Europe/London" },
  { city: "New York", identifier: "America/New_York" },
];

class WeatherBoard extends React.Component {
  componentDidMount() {
    if (!this.props.match.params.name) {
      this.props.fetchCityWeather("Sydney");
    } else {
      this.props.fetchCityWeather(this.props.match.params.name);
    }
  }

  render() {
    const { weather } = this.props;
    if (!weather) {
      return null;
    }
    return (
      <div
        className="weatherBoard"
        style={renderBackground(weather.main, weather.dayPart)}
      >
        <div className="weatherBoard-cover">
          <WeatherCard cities={cities} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { weather: state.weather };
};

export default connect(mapStateToProps, { fetchCityWeather })(WeatherBoard);
