import React from 'react';
import { Card, Grid, CardContent, Typography, Divider, Box } from '@mui/material';
import { styled } from '@mui/system';
import Slider from 'react-slick';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import CloudIcon from '@mui/icons-material/Cloud';
import GrainIcon from '@mui/icons-material/Grain';
import FlashOnIcon from '@mui/icons-material/FlashOn';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const GlassCard = styled(Card)(({ theme }) => ({
    backdropFilter: 'blur(20px)',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const weatherIcons = {
    Clear: <WbSunnyIcon />,
    Clouds: <CloudIcon />,
    Rain: <GrainIcon />,
    Thunderstorm: <FlashOnIcon />,
    // Add more mappings as needed
};

const Forecast = ({ forecastData }) => {
    // Group forecast data by day
    const groupedData = forecastData.reduce((acc, current) => {
        const date = new Date(current.dt * 1000).toLocaleDateString();
        if (!acc[date]) {
            acc[date] = [];
        }
        acc[date].push(current);
        return acc;
    }, {});

    const days = Object.keys(groupedData);
    const firstDay = groupedData[days[0]];
    const upcomingDays = days.slice(1).map(day => ({
        date: day,
        data: groupedData[day],
    }));

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Box display="flex" justifyContent="space-between">
            <Grid container spacing={0} style={{ width: '90vw', margin: 0, gap: '35px' }}>
                <Grid item xs={12} md={5.8}>
                    <GlassCard style={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h4" style={{ color: "#043b5c", fontWeight: "600" }} gutterBottom>Current Day Forecast</Typography>
                            <Divider />
                            <Box display="flex" flexDirection="row" overflow="auto">
                                {firstDay.map((hour, index) => (
                                    <Box key={index} mt={2} mr={2} style={{ padding: "12px", minWidth: "120px", background: "rgba(0, 181, 204, 0.3)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
                                        <Typography variant="body1" style={{ fontSize: "14px" }}>
                                            Time: {new Date(hour.dt * 1000).toLocaleTimeString()}
                                        </Typography>
                                        <Typography variant="body1" style={{ fontSize: "14px" }}>
                                            Temperature: {hour.main.temp} °C
                                        </Typography>
                                        <Typography variant="body1" style={{ fontSize: "14px" }}>
                                            Description: {hour.weather[0].description} {weatherIcons[hour.weather[0].main]}
                                        </Typography>
                                        <Divider />
                                    </Box>
                                ))}
                            </Box>
                        </CardContent>
                    </GlassCard>
                </Grid>
                <Grid item xs={12} md={5.8}>
                    <GlassCard style={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h4" style={{ color: "#043b5c", fontWeight: "600" }} gutterBottom>Upcoming 5-Day Forecast</Typography>
                            <Divider />

                            <Slider {...settings} style={{ height: '100%' }}>
                                {upcomingDays.map((day, index) => (
                                    <Box key={index} p={2}>
                                        <Typography variant="h6">Date: {day.date}</Typography>
                                        <Box display="flex" flexDirection="row" overflow="auto" >
                                            {day.data.map((hour, idx) => (
                                                <Box key={idx} mt={2} mr={2} style={{ padding: "12px", minWidth: "120px", background: "rgba(0, 181, 204, 0.3)", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
                                                    <Typography variant="body2" style={{ fontSize: "12px" }}>
                                                        Time: {new Date(hour.dt * 1000).toLocaleTimeString()}
                                                    </Typography>
                                                    <Typography variant="body2" style={{ fontSize: "12px" }}>
                                                        Temperature: {hour.main.temp} °C
                                                    </Typography>
                                                    <Typography variant="body2" style={{ fontSize: "12px" }}>
                                                        Description: {hour.weather[0].description} {weatherIcons[hour.weather[0].main]}
                                                    </Typography>
                                                    <Divider />
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Slider>
                        </CardContent>
                    </GlassCard>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Forecast;
