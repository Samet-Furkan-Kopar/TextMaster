import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  dailyCounter: number;
}
const initialState : CounterState = {
  dailyCounter: 0,
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    dailyCounterIncrease: (state: any) => {
      state.dailyCounter++
    },
    resetDailyCounter: (state: any) => {
      state.dailyCounter = 0;
    },
  },
});

export const counterActions = counterSlice.actions;
export default counterSlice.reducer;