import {store} from "../store"
import {counterActions} from "./counterSlice"

export const resetDailyCounter = () => store.dispatch(counterActions.resetDailyCounter())
export const dailyCounterIncrease = () => store.dispatch(counterActions.dailyCounterIncrease())
