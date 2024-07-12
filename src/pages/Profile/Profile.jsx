import React, { useEffect, useState } from 'react';
import { Typography, Button, Grid, Card, CardContent, IconButton } from '@mui/material';
import WeatherCard from '../../components/WeatherCard';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../microInteraction/Alert'; // Import Alert component

const Profile = () => {
    const { isLoggedIn, logout, authUsername } = useAuth();
    const [likedCards, setLikedCards] = useState([]);
    const [alert, setAlert] = useState(null); // State for displaying alerts

    useEffect(() => {
        if (isLoggedIn) {
            const savedLikedCards = JSON.parse(localStorage.getItem('likedCards')) || [];
            setLikedCards(savedLikedCards);
        } else {
            setLikedCards([]);
        }
    }, [isLoggedIn]);

    const handleRemoveCard = (location) => {
        const updatedCards = likedCards.filter(card => card.location !== location);
        localStorage.setItem('likedCards', JSON.stringify(updatedCards));
        setLikedCards(updatedCards);
        setAlert({
            type: 'success',
            message: 'Successfully removed liked card.',
            position: 'bottom-right',
            duration: 5000,
        });
    };

    return (
        <div style={{ maxWidth: '90vw', margin: 'auto', padding: '20px' }}>
            <Typography variant="h3" align="left" style={{ marginTop: "50px", color: "#043b5c", fontWeight: "600" }} gutterBottom>User Profile</Typography>
            {isLoggedIn ? (
                <>
                    <Typography variant="h5" gutterBottom>{authUsername}</Typography>

                    {likedCards.length > 0 ? (
                        <div>
                            <Typography variant="h5" align="left" style={{ marginTop: "20px", color: "#043b5c", fontWeight: "600" }} gutterBottom>Liked Cards:</Typography>
                            <Grid container spacing={2}>
                                {likedCards.map((card, index) => (
                                    <Grid item xs={12} sm={6} key={index}>
                                        <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                            <CardContent style={{ flexGrow: 1 }}>
                                                <WeatherCard
                                                    weatherData={{
                                                        main: {
                                                            temp: card.cardData.temperature,
                                                            feels_like: card.cardData.feelsLike,
                                                            humidity: card.cardData.humidity
                                                        },
                                                        wind: {
                                                            speed: card.cardData.windSpeed
                                                        },
                                                        weather: [{
                                                            description: card.cardData.description
                                                        }],
                                                        name: card.location
                                                    }}
                                                    location={card.location}
                                                    address={card.cardData.address}
                                                />
                                            </CardContent>
                                            <IconButton onClick={() => handleRemoveCard(card.location)} style={{ alignSelf: 'flex-end' }}>
                                                <DeleteIcon />
                                            </IconButton>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </div>
                    ) : (
                        <Typography variant="body1">You have no liked cards.</Typography>
                    )}
                    <Button variant="contained" color="secondary" onClick={logout} style={{ width: '30%', left: "35%", marginTop: "30px", height: '55px', backgroundColor: "#043b5c", cursor: "pointer", color: "white" }}>
                        Logout
                    </Button>
                </>
            ) : (
                <Typography variant="body1">Please log in to view your profile.</Typography>
            )}
            {alert && <Alert {...alert} />} {/* Display the alert */}
        </div>
    );
};

export default Profile;
