// reducers/exampleReducer.ts
import {createSlice} from '@reduxjs/toolkit';

const nfcSlice = createSlice({
  name: 'list',
  initialState: {value: 0},
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
  },
});

export const {increment, decrement} = nfcSlice.actions;
export default nfcSlice.reducer;
