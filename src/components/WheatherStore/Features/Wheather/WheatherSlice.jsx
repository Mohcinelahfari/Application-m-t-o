import { createSlice } from "@reduxjs/toolkit"


const initialState  ={
    clouds : undefined,
    main: {
        temp : undefined  
    },
    sys: {
        country : undefined
    },
    weather: undefined,
     name: undefined,
      wind: {
        speed : undefined,
        
      },
      isLoaded : false
}

const WheatherSlice = createSlice({
    name : "wheather",
    initialState,
    reducers : {
        setDataWheather : (state, action) =>{
            const {clouds,main , sys, weather, name, wind} = action.payload
            state.clouds = clouds
            state.main = main
            state.name = name
            state.sys = sys
            state.weather = weather[0]
            state.wind = wind
            state.isLoaded = true
        },
        resetDataWeather : (state) => {
            state.isLoaded = false
        }
    }
})


export const {setDataWheather, resetDataWeather} = WheatherSlice.actions
export default WheatherSlice.reducer