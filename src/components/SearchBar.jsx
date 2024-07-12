// SearchBar.jsx

import React, { useState } from 'react';
import { TextField, Autocomplete, Button, CircularProgress } from '@mui/material';
import axios from 'axios';

const SearchBar = ({ onSearch }) => {
    const [location, setLocation] = useState(null); // Use null instead of empty string for location
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading status

    const handleLocationChange = async (event, newValue) => {
        setLocation(newValue);

        if (newValue) {
            setLoading(true); // Set loading to true when fetching suggestions
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const response = await axios.get(
                    `https://api.openweathermap.org/geo/1.0/direct?q=${newValue}&limit=5&appid=${apiKey}`
                );
                const data = response.data || [];
                console.log('Received suggestions:', data);
                const mappedSuggestions = data.map(place => ({
                    label: place.name,
                    lat: place.lat,
                    lon: place.lon,
                }));
                setSuggestions(mappedSuggestions);
            } catch (error) {
                console.error('Error fetching city suggestions:', error);
                setSuggestions([]);
            } finally {
                setLoading(false); // Set loading to false after fetching is done
            }
        } else {
            setSuggestions([]);
        }
    };

    const handleSearchButtonClick = () => {
        if (location) {
            console.log('Searching for:', location.label);
            onSearch(location.label); // Send location label (city name) to the Home component
        } else {
            console.error('No location selected');
        }
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Autocomplete
                options={suggestions}
                getOptionLabel={(option) => option.label || ''}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Search for a city"
                        variant="outlined"
                        onChange={(e) => handleLocationChange(e, e.target.value)}
                        value={location ? location.label : ''} // Display selected location label
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {loading && <CircularProgress color="inherit" size={20} />}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
                onChange={(event, newValue) => setLocation(newValue)}
                style={{ width: '70%', marginRight: '10px' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearchButtonClick}
                disabled={!location}
                style={{ width: '30%', height:'55px',backgroundColor:"#043b5c", cursor:"pointer", color:"white" }}
            >
                Search
            </Button>
        </div>
    );
};

export default SearchBar;
