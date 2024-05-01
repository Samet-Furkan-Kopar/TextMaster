// import { RootState } from "@/store/store";
import {useSelector} from "react-redux"
export const useCounter = () => useSelector((state: any) => state.counter)

// import { useSelector } from "react-redux";

// export const useCounter = () => useSelector((state: RootState) => state.counter)