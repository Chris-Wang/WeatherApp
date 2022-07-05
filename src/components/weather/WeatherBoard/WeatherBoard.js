import './WeatherBoard.css';
import React, { useEffect } from 'react';
import WeatherCard from '../WeatherCard';
import { renderBackground } from '../../../utils';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateWeather } from '../../../store/weather/weatherSlice';
import {
  useGetPositionQuery,
  useGetWeatherByPositionQuery,
} from '../../../store/apis/weather';

const cities = [
  { city: 'Sydney', identifier: 'Australia/Sydney' },
  { city: 'Seoul', identifier: 'Asia/Seoul' },
  { city: 'London', identifier: 'Europe/London' },
  { city: 'New York', identifier: 'America/New_York' },
];

const WeatherBoard = (props) => {
  const { name = 'Sydney' } = useParams();
  const dispatch = useDispatch();
  const weather = useSelector((state) => state.weather);
  const { data: pos, isLoading, isError } = useGetPositionQuery(name);
  const { data: rawData } = useGetWeatherByPositionQuery(pos);

  useEffect(() => {
    if (rawData) dispatch(updateWeather({ city: name, data: rawData }));
  }, [dispatch, name, rawData]);

  if (!weather) return <>Loading</>;

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
};

export default WeatherBoard;
