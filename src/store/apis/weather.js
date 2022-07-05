//apis/weather.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_key = 'c8e76c9b4fa36112b0d8aff693cee1fc';

// Define a service using a base URL and expected endpoints
export const weatherApi = createApi({
  reducerPath: 'weatherApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://api.openweathermap.org/data/2.5',
  }),
  endpoints: (builder) => ({
    getPosition: builder.query({
      query: (city) => {
        return {
          url: `/weather?q=${city}&appid=${API_key}`,
        };
      },
    }),
    getWeatherByPosition: builder.query({
      query: (arg) => {
        const { coord } = arg;
        return {
          url: `onecall?lat=${coord.lat}&lon=${coord.lon}&exclude=minutely,hourly,alerts&appid=${API_key}`,
        };
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPositionQuery, useGetWeatherByPositionQuery } = weatherApi;
