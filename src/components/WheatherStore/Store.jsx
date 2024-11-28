import { configureStore } from "@reduxjs/toolkit";
import wheatherSlice from "./Features/Wheather/WheatherSlice"
export const store = configureStore({
    reducer : {
        wheather : wheatherSlice
    }
})