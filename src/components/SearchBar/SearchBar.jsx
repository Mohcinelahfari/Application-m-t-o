import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Autocomplete, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetDataWeather, setDataWheather } from "../WheatherStore/Features/Wheather/WheatherSlice";
export const SearchBar = () => {
    const [cities, setCities] = useState([])
    const [Unity, setUnity] = useState('metric')
    const [geoLocation, setgeoLocation] = useState(undefined)
    const [isCurrentLocation, setisCurrentLocation] = useState(false)
    const dispatch = useDispatch()
    const GEO_API_KEY =  process.env.REACT_APP_GEO_API_KEY
    const WHEATHER_API_KEY = process.env.REACT_APP_WEATHER_API
    
    const GetGeolocation = () => {
        navigator.geolocation.getCurrentPosition((position) => {
            setisCurrentLocation(true)
            setgeoLocation({
                lat : position.coords.latitude,
                lon : position.coords.longitude
            })
        },)
    }



    const getDataWeather = () => {
        if(geoLocation){
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${geoLocation.lat}&units=${Unity}&lon=${geoLocation.lon}&appid=${WHEATHER_API_KEY}`)
            .then((response) => response.json())
            .then((json) => {
                const {clouds,main , sys, weather, name, wind} = json
                dispatch(setDataWheather({clouds,main , sys, weather, name, wind}))
            })
            .catch((error) => console.error("Error fetching weather data:", error));
        }
    }
    useEffect(() => {

            GetGeolocation()
        
    })

    useEffect(() => {
        getDataWeather()
    },[geoLocation])
    const handelchange = (e) => {
        const {value} = e.currentTarget
        console.log(GEO_API_KEY)
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=${value}&apiKey=${GEO_API_KEY}`)
        .then((response) => response.json())
        .then((json) => setCities(json.features?.map(data => {
            const { city, country, state, formatted } = data.properties;  // properties contain city, country, etc.
            const [lon, lat] = data.geometry.coordinates; 
            return {city, country, state, lat, lon,formatted}
        }
        )))
    }

    const handelAutoCompliteChange = (e, value) => {
        
        if(value != null){
            const { lat, lon } = value;
            setisCurrentLocation(false)
            setgeoLocation({
                lat, 
                lon
            })
        
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
                                 
                    <Button disabled={geoLocation === undefined || isCurrentLocation === true} onClick={() => GetGeolocation()} size={'sm'} variant='primary'>Get Location</Button>

                
                </Form.Group>
            </Form>
        </>
    )
}