import React from 'react';
import { Card } from '@mui/material';
import { styled } from '@mui/system';
import { useAuth } from '../context/AuthContext';

// Define weather image URLs based on description
const weatherImages = {
    'sunny': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHmrp_IQx8Wo5hI-Iaxmbj-mmAFZWFjdXVBg&s',
    'clear sky': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYZ2nS50I5PqyznLPFRX-Qq_-88q_pVydpXA&s',
    'few clouds': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxNryozVFntnkjXy_dhKiPZgd1XcQBON8xsg&s',
    'scattered clouds': 'https://media.istockphoto.com/id/1028827352/photo/sky.webp?b=1&s=170667a&w=0&k=20&c=qzJ9_hGmBXPfaMwYTJhirOrvmUbyV1ym2n-oF9IcbmE=',
    'overcast clouds': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9ltlHHYas0WcfxO1GBqVv6HuNgLRHft03Dg&s',
    'broken clouds': 'https://img.freepik.com/free-photo/cloudy-sky-landscape-wallpaper_23-2149134115.jpg?t=st=1720800740~exp=1720804340~hmac=2ee01df37441a869eb9b758b04968ae6e71f082225036707ed593c4a33584b5a&w=900',
    'shower rain': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMShOhjWg0SZU8LWcoodgtj9BS4Oqu3xtBSg&s',
    'rain': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMShOhjWg0SZU8LWcoodgtj9BS4Oqu3xtBSg&s',
    'light rain': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMShOhjWg0SZU8LWcoodgtj9BS4Oqu3xtBSg&s',
    'moderate rain': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMShOhjWg0SZU8LWcoodgtj9BS4Oqu3xtBSg&s',
    'thunderstorm': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb_nBnJ3AoquRoI_04shbKSj2VwuRV35nckw&s',
    'snow': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRkjw6VYYClf1IvygyA8nQVmn28wB-koG8szQ&s',
    'mist': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRa5L8PDQFyNTu6w-4Ils-Cm6xFn9D41XDLbQ&s',
    'haze': 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3W_5TZXk6CNE2eqIyrnj9paImzjyim1DMJA&s'
};

const GlassCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}));

const WeatherImageCard = ({ weatherData }) => {
    const { isLoggedIn } = useAuth();

    const getWeatherImage = (description) => {
        // Default to a generic weather image if description does not match
        let imageUrl = 'https://example.com/default.jpg'; // Replace with actual default image URL

        // Check if there's a specific image URL for the description
        if (weatherImages.hasOwnProperty(description.toLowerCase())) {
            imageUrl = weatherImages[description.toLowerCase()];
        }

        return imageUrl;
    };


    if (!weatherData) return null;

    const weatherDescription = weatherData.weather[0].description;

    return (
        <GlassCard>
            <img
                src={getWeatherImage(weatherDescription)}
                alt={weatherDescription}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: '10px',
                }}
            />
        </GlassCard>
    );
};

export default WeatherImageCard;
