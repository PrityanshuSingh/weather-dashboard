import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/system';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAuth } from '../context/AuthContext';
import Alert from '../microInteraction/Alert'; // Import Alert component

const GlassCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: '100%',
}));

const WeatherCard = ({ weatherData, location, address }) => {
    const [liked, setLiked] = useState(false);
    const { isLoggedIn } = useAuth();
    const [alertpop, setAlertPop] = useState(null); // State for displaying alerts

    useEffect(() => {
        const likedCards = JSON.parse(localStorage.getItem('likedCards')) || [];
        setLiked(likedCards.some(card => card.location === weatherData.name));
    }, [weatherData?.name]);

    const handleLikeClick = () => {
        if (!isLoggedIn) {
            
            setAlertPop({
                type: 'error',
                message: 'Please login to like the weather card.',
                position: 'bottom-right',
                duration: 2000,
            });
            setTimeout(() => {
                alert('Redirecting you to login.');
                
            }, 4000);
            
            window.location.href = '/login';
            return;
        }

        // if (!isLoggedIn) {
        //     alert('Redirecting you to login window.');
        //     window.location.href = '/login'; // Redirecting to login page
        //     return;
        // }

        const likedCards = JSON.parse(localStorage.getItem('likedCards')) || [];
        const cardToLike = {
            location: weatherData.name,
            cardData: {
                temperature: weatherData.main.temp,
                feelsLike: weatherData.main.feels_like,
                humidity: weatherData.main.humidity,
                windSpeed: weatherData.wind.speed,
                description: weatherData.weather[0].description,
                address: address || ''
            }
        };

        const isAlreadyLiked = likedCards.some(card => card.location === weatherData.name);
        if (!isAlreadyLiked) {
            localStorage.setItem('likedCards', JSON.stringify([...likedCards, cardToLike]));
            setLiked(true);
            setAlertPop({
                type: 'success',
                message: 'Successfully liked the weather card.',
                position: 'bottom-right',
                duration: 5000,
            });
        }
    };

    if (!weatherData) return null;

    return (
        <>
        <GlassCard>
            <CardContent>
                <IconButton onClick={handleLikeClick} style={{ float: 'right' }}>
                    <FavoriteIcon color={liked ? 'error' : 'action'} />
                </IconButton>
                <Typography variant="h4" style={{ color: "#043b5c", fontWeight: "600" }}>Current Weather</Typography>
                {address ? (
                    <div>
                        <Typography variant="h5">{weatherData.name}</Typography>
                        <Typography variant="caption" id="address">{address}</Typography>
                    </div>
                ) : (
                    <Typography variant="h5">{weatherData.name}</Typography>
                )}

                <Box mt={2} mr={2} style={{ padding: "12px", minWidth: "120px", background: "rgba(0, 181, 204, 0.3)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
                    <Typography variant="body1">Temperature: {weatherData.main.temp} °C</Typography>
                    <Typography variant="body1">Feels Like: {weatherData.main.feels_like} °C</Typography>
                    <Typography variant="body1">Humidity: {weatherData.main.humidity}%</Typography>
                    <Typography variant="body1">Wind Speed: {weatherData.wind.speed} m/s</Typography>
                    <Typography variant="body1">Description: {weatherData.weather[0].description}</Typography>
                </Box>
            </CardContent>
            
        </GlassCard>
        {alertpop && <Alert {...alertpop} />} {/* Display the alert */}
        </>
    );
};

export default WeatherCard;
