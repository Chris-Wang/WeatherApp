import openWeather from "../apis/openWeather";
import { formatResponse } from "../utils";
import backServer from "../apis/backServer";

const API_key = "c8e76c9b4fa36112b0d8aff693cee1fc";

export const fetchCityWeather = (city) => {
  return async (dispatch) => {
    const { data } = await openWeather.get(
      `/weather?q=${city}&appid=${API_key}`
    );
    const { name, coord } = data;
    const response = await openWeather.get(
      `onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&appid=${API_key}`
    );

    const payload = formatResponse(name, response.data);

    dispatch({ type: "FETCH_CITYWEATHER", payload: payload });
  };
};
