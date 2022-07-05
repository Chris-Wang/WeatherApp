//weatherSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { formatResponse } from './utils';

export const weatherSlice = createSlice({
  name: 'weather',
  initialState: { weather: null, city: '' },
  reducers: {
    updateWeather: (state, { payload }) => {
      const { city, data } = payload;
      const weather = formatResponse(city, data);
      return {
        ...weather,
      };
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
