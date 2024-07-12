import React, { useEffect, useRef, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, TimeScale, registerables } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { format, parseISO, addDays } from 'date-fns';
import { styled } from '@mui/system';
import { Card, CardContent, Typography } from '@mui/material';

Chart.register(...registerables, TimeScale);

const GlassContainer = styled('div')(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    marginBottom: theme.spacing(2),
}));

const TemperatureChart = ({ chartData }) => {
    const chartRef = useRef(null);
    const [field, setField] = useState('temp'); // Default field to show is temperature

    useEffect(() => {
        const currentChartInstance = chartRef.current?.chartInstance;
        if (currentChartInstance) {
            currentChartInstance.destroy();
        }
    }, [chartData, field]);

    if (!chartData || !Array.isArray(chartData) || chartData.length === 0) {
        return null;
    }

    // Filter data for the next 5 days
    const now = new Date();
    const fiveDaysLater = addDays(now, 5);

    const filteredData = chartData.filter(day => {
        const date = parseISO(day.dt_txt);
        return date > now && date < fiveDaysLater;
    });

    // Prepare data for the chart
    const data = {
        labels: filteredData.map(day => format(parseISO(day.dt_txt), 'yyyy-MM-dd HH:mm:ss')),
        datasets: [{
            label: field === 'temp' ? 'Temperature (°C)' : 'Humidity (%)',
            data: filteredData.map(day => (field === 'temp' ? day.main.temp : day.main.humidity)),
            fill: false,
            borderColor: field === 'temp' ? 'rgb(75, 192, 192)' : 'rgb(54, 162, 235)',
            tension: 0.1
        }]
    };

    // Chart options
    const options = {
        scales: {
            x: {
                type: 'time',
                time: {
                    unit: 'day', // Display units by day
                    tooltipFormat: 'PPpp'
                },
                title: {
                    display: true,
                    text: 'Date'
                }
            },
            y: {
                title: {
                    display: true,
                    text: field === 'temp' ? 'Temperature (°C)' : 'Humidity (%)'
                }
            }
        }
    };

    // Handle field change between temperature and humidity
    const handleFieldChange = (newField) => {
        setField(newField);
    };

    return (
        <GlassContainer>
            <Typography variant="h4" style={{ color: "#043b5c", fontWeight: "600" }}>Weather 5 Day Forecast Chart</Typography>
            <div>
                <button
                    onClick={() => handleFieldChange('temp')}
                    style={{
                        width: '100px',
                        height: '30px',
                        backgroundColor: field === 'temp' ? '#043b5c' : 'transparent',
                        color: field === 'temp' ? 'white' : '#043b5c',
                        border: '1px solid #043b5c',
                        borderRadius: '5px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        outline: 'none'
                    }}
                >
                    Temperature
                </button>
                <button
                    onClick={() => handleFieldChange('humidity')}
                    style={{
                        width: '100px',
                        height: '30px',
                        backgroundColor: field === 'humidity' ? '#043b5c' : 'transparent',
                        color: field === 'humidity' ? 'white' : '#043b5c',
                        border: '1px solid #043b5c',
                        borderRadius: '5px',
                        cursor: 'pointer',
                        outline: 'none'
                    }}
                >
                    Humidity
                </button>
            </div>
            <Line data={data} options={options} ref={chartRef} />
        </GlassContainer>
    );
};

export default TemperatureChart;
