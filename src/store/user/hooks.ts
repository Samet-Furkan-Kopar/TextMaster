import {useSelector} from "react-redux"

export const useAccount = () => useSelector((state:any) => state.auth.currentAccount)
