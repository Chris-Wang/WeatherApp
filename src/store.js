import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import { weatherApi } from './apis/weather';

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    [weatherApi.reducerPath]: weatherApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(weatherApi.middleware),
});
