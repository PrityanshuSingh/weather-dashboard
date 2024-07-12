import React, { useState } from 'react';
import { Container, Grid, Typography, ThemeProvider, createTheme } from '@mui/material';

// Components
import SearchBar from '../../components/SearchBar';
import MapSearch from '../../components/MapSearch';
import WeatherCard from '../../components/WeatherCard';
import WeatherImage from '../../components/WeatherImage'
import Forecast from '../../components/Forecast';
import TemperatureChart from '../../components/TemperatureChart';
import Alert from '../../microInteraction/Alert';

const theme = createTheme({
    palette: {
        background: {
            default: '#f0f0f0', // Change this to your desired background color
        },
    },
});

const Home = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [forecastData, setForecastData] = useState([]);
    const [chartData, setChartData] = useState([]);
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [alert, setAlert] = useState(null);
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const fetchWeatherData = async (location) => {

        try {
            
            console.log(location);
            // Split city address where commas occur
            const parts = location.split(',');
            let geoData = null;

            // Iterate through each part and try to find geodata
            for (let i = 0; i < parts.length; i++) {
                const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${parts[i].trim()}&limit=1&appid=${apiKey}`;
                const geoResponse = await fetch(geoUrl);
                const data = await geoResponse.json();

                if (data.length > 0) {
                    geoData = data[0];
                    break; // Stop searching if geodata is found
                }
            }

            if (geoData) {
                const { lat, lon } = geoData;
                console.log('Geodata:', geoData);

                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const currentResponse = await fetch(currentWeatherUrl);
                const currentWeatherJson = await currentResponse.json();

                const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const forecastResponse = await fetch(forecastWeatherUrl);
                const forecastWeatherJson = await forecastResponse.json();

                console.log(currentWeatherJson);
                setWeatherData(currentWeatherJson);
                setForecastData(forecastWeatherJson.list || []);
                setChartData(forecastWeatherJson.list || []);
                setAlert({ 
                    type: 'success', 
                    message: `Successfully fetched weather conditions !`, 
                    position: 'bottom-right', 
                    duration: 5000, 
                    
                });
            } else {
                console.error('No geodata found for any part of the city:', location);
                setAlert({
                    type: 'error',
                    message: `No geodata found`,
                    position: 'bottom-right',
                    duration: 4000,
            
                  });
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setAlert({
                type: 'error',
                message: `Error fetching weather conditions !`,
                position: 'bottom-right',
                duration: 4000,
        
            });
        }

    };

    const handleSearchMap = async (location, address, lat, lon) => {

        setLocation(location);
        setAddress(address);
        if (lat && lon) {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const currentResponse = await fetch(currentWeatherUrl);
                const currentWeatherJson = await currentResponse.json();

                const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const forecastResponse = await fetch(forecastWeatherUrl);
                const forecastWeatherJson = await forecastResponse.json();

                console.log(currentWeatherJson);
                setWeatherData(currentWeatherJson);
                setForecastData(forecastWeatherJson.list || []);
                setChartData(forecastWeatherJson.list || []);
                setAlert({ 
                    type: 'success', 
                    message: `Successfully fetched weather conditions !`, 
                    position: 'bottom-right', 
                    duration: 5000, 
                    
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setAlert({
                    type: 'error',
                    message: `Error fetching weather conditions !`,
                    position: 'bottom-right',
                    duration: 4000,
            
                  });
                // Handle error
            }
        }
        else {
            fetchWeatherData(location);
        }

    };

    const handleSearchBar = async (location, address, lat, lon) => {

        setLocation(location);
        setAddress(address);
        if (lat && lon) {
            try {
                const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
                const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const currentResponse = await fetch(currentWeatherUrl);
                const currentWeatherJson = await currentResponse.json();

                const forecastWeatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
                const forecastResponse = await fetch(forecastWeatherUrl);
                const forecastWeatherJson = await forecastResponse.json();

                console.log(currentWeatherJson);
                setWeatherData(currentWeatherJson);
                setForecastData(forecastWeatherJson.list || []);
                setChartData(forecastWeatherJson.list || []);
                setAlert({ 
                    type: 'success', 
                    message: `Successfully fetched weather conditions !`, 
                    position: 'bottom-right', 
                    duration: 5000, 
                    
                });
            } catch (error) {
                console.error('Error fetching data:', error);
                setAlert({
                    type: 'error',
                    message: `Error fetching weather conditions !`,
                    position: 'bottom-right',
                    duration: 4000,
            
                  });
                // Handle error
            }
        }
        else {
            fetchWeatherData(location);
        }

    };

    return (
        <ThemeProvider theme={theme}>
            <Container>
                <Typography variant="h3" align="left" style={{marginTop:"50px", color:"#043b5c", fontWeight:"600" }} gutterBottom>
                    Weather Dashboard
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <SearchBar onSearch={handleSearchBar} />
                    </Grid>
                </Grid>
                    <Typography variant="h6" align="center" style={{ color:"#043b5c"}} gutterBottom>
                    or
                    <br/>
                    </Typography>
                    <Typography variant="h6" align="left" style={{ color:"#043b5c" }} gutterBottom>
                        Search weather for any remote location in the world
                    </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <MapSearch onSearch={handleSearchMap} />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {weatherData && <WeatherCard weatherData={weatherData} location={location} address={address}  />}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {weatherData && <WeatherImage weatherData={weatherData} location={location} address={address} />}
                    </Grid>
                    <Grid item xs={12} md={6}>
                        {forecastData.length > 0 && <Forecast forecastData={forecastData} />}
                    </Grid>
                    <Grid item xs={12} >
                        {chartData.length > 0 && <TemperatureChart chartData={chartData} />}
                    </Grid>
                </Grid>
            </Container>
            {alert && <Alert {...alert} />}
        </ThemeProvider>
    );
};

export default Home;
