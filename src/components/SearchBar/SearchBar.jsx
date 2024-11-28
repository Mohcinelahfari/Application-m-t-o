import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetDataWeather, setDataWheather } from "../WheatherStore/Features/Wheather/WheatherSlice";
export const SearchBar = () => {
    const [cities, setCities] = useState([])
    const [Unity, setUnity] = useState('metric')
    const dispatch = useDispatch()
    const GEO_API_KEY =  process.env.REACT_APP_GEO_API_KEY
    const WHEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    console.log(WHEATHER_API_KEY)
    const handelchange = (e) => {
    
        const {value} = e.currentTarget
        console.log(GEO_API_KEY)
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${GEO_API_KEY}`)
        .then((response) => response.json())
        .then((json) => setCities(json.features.map(data => {
            const { city, country, state, formatted } = data.properties;  // properties contain city, country, etc.
            const [lon, lat] = data.geometry.coordinates; 
            return {city, country, state, lat, lon,formatted}
        }
        )))
    }

    const handelAutoCompliteChange = (e, value) => {
        
        if(value != null){
            const { lat, lon } = value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=${Unity}&lon=${lon}&appid=${WHEATHER_API_KEY}`)
            .then((response) => response.json())
            .then((json) => {
                const {clouds,main , sys, weather, name, wind} = json
                dispatch(setDataWheather({clouds,main , sys, weather, name, wind}))
            })
            .catch((error) => console.error("Error fetching weather data:", error));
        }else{
            dispatch(resetDataWeather())
        }
    };
    
    return (  
        <>
            <Form>
                <Form.Group className={styles.searchContainer}>
                <Autocomplete  className={styles.searchInput} clearOnBlur={false} getOptionLabel={(option) => option.formatted}
                    onChange={handelAutoCompliteChange}
                renderInput={(params) => <TextField
                 {...params} onChange={handelchange} label='Enter your city ...' />} options={cities} />
                    <Button size={'sm'} variant='primary'>Search</Button>
                </Form.Group>
            </Form>
        </>
    )
}