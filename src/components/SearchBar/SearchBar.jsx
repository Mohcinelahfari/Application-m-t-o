import {Button, Form} from "react-bootstrap";
import styles from  './SearchBar.module.scss'
import { Autocomplete, TextField } from "@mui/material";
export const SearchBar = () => {
    const GEO_API_KEY =  process.env.REACT_APP_GEO_API_KEY
    const handelchange = (e) => {
    
        const {value} = e.currentTarget
        console.log(GEO_API_KEY)
        fetch(`https://api.geoapify.com/v1/geocode/autocomplete?text=Paris&apiKey=de7a1b4e35e74e31ba4e370bf210ba4c`)
        .then((response) => response.json())
        .then((json) => console.log(json))
        console.log(value)
    }
    return (  
        <>
            <Form>
                <Form.Group className={styles.searchContainer}>
                <Autocomplete className={styles.searchInput} renderInput={(params) => <TextField
                 {...params} onChange={handelchange} label='Enter your city ...' />} options={['CasaBlanca','Rabat','fes']} />
                    <Button size={'sm'} variant='primary'>Search</Button>
                </Form.Group>
            </Form>
        </>
    )
}