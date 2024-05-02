import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface AuthState {
    currentAccount: string | null;
}
const initialState: AuthState = {
    currentAccount: null,
};

const UserSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        _deleteAccount: (state:any) => {
            state.currentAccount = null;
        },
        _setCurrentAccount: (state, action: PayloadAction<string>) => {
            state.currentAccount = action.payload;
        },
    },
});

export const userActions = UserSlice.actions;
export default UserSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";

// interface CounterState {
//   dailyCounter: number;
// }
// const initialState : CounterState = {
//   dailyCounter: 0,
// };

// const counterSlice = createSlice({
//   name: "counter",
//   initialState,
//   reducers: {
//     dailyCounterIncrease: (state: any) => {
//       state.dailyCounter++
//     },
//     resetDailyCounter: (state: any) => {
//       state.dailyCounter = 0;
//     },
//   },
// });

// export const counterActions = counterSlice.actions;
// export default counterSlice.reducer;