import React, { useState, useEffect } from 'react';
import { TextField, Button, Autocomplete } from '@mui/material';
import { styled } from '@mui/system';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import axios from 'axios';
import L from 'leaflet'; // Import leaflet library
import 'leaflet/dist/leaflet.css';


const GlassContainer = styled('div')(({ theme }) => ({
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: '10px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '20px',
}));

const MapClickHandler = ({ onMapClick }) => {
    useMapEvents({
        click(e) {
            onMapClick(e.latlng);
        },
    });
    return null;
};

const MapSearch = ({ onSearch }) => {
    const [location, setLocation] = useState('');
    const [address, setAddress] = useState('');
    const [position, setPosition] = useState({ lat: 51.505, lng: -0.09 }); // Default position (London)
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false); // State to track loading status

    useEffect(() => {
        if (location.length > 2) {
            console.log('Fetching suggestions for:', location);
            setLoading(true); // Set loading to true when fetching suggestions
            axios.get(`https://nominatim.openstreetmap.org/search?q=${location}&format=json`)
                .then(response => {
                    const data = response.data || [];
                    console.log('Received suggestions:', data);
                    const mappedSuggestions = data.map(place => ({
                        label: place.display_name,
                        lat: parseFloat(place.lat),
                        lon: parseFloat(place.lon),
                    }));
                    setSuggestions(mappedSuggestions);
                })
                .catch(error => console.error('Error fetching city suggestions:', error))
                .finally(() => {
                    console.log('Finished fetching suggestions');
                    setLoading(false); // Set loading to false after fetching is done
                });
        } else {
            setSuggestions([]);
        }
    }, [location]);

    const handleMapClick = (latlng) => {
        console.log('Map clicked at:', latlng);
        setPosition({ lat: latlng.lat, lng: latlng.lng });
        setLoading(true); // Set loading to true when fetching address
        axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
            .then(response => {
                const place = response.data;
                const newAddress = place.display_name;
                console.log('Reverse geocoding result:', place);
                if (place && place.address) {
                    const newLocation = place.address.hamlet ||
                        place.address.village ||
                        place.address.town ||
                        place.address.county ||
                        place.address.suburb ||
                        place.address.city ||
                        place.address.district ||
                        place.address.state_district ||
                        place.address.state ||
                        place.address.country || '';
                    console.log('Location found:', newLocation);
                    setAddress(newAddress);
                    setLocation(newLocation);
                } else {
                    console.error('No address found for the selected coordinates:', latlng);
                }
            })
            .catch(error => console.error('Error reverse geocoding:', error))
            .finally(() => {
                console.log('Finished reverse geocoding');
                setLoading(false); // Set loading to false after fetching is done
            });
    };

    const handleLocationChange = (event, newValue) => {
        if (newValue) {
            console.log('Selected location:', newValue);
            setLocation(newValue.label);
            setAddress(newValue.label);
            setPosition({ lat: newValue.lat, lng: newValue.lon });
        } else {
            setLocation('');
        }
    };

    const handleSearch = () => {
        console.log('Searching for location:', location);
        if (location) {
            setLoading(true); // Set loading to true when fetching weather data
            onSearch(location, address, position.lat, position.lng);
            console.log('Finished search for location:', location);
            setLoading(false); // Set loading to false after fetching is done
        } else {
            console.error('No location provided');
        }
    };

    // Define custom pin icon
    const customIcon = L.icon({
        iconUrl: "/assets/pin.png",
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30],
    });

    return (
        <GlassContainer>
            <MapContainer
                center={position}
                zoom={13}
                style={{ height: '300px', width: '100%', marginBottom: '20px' }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapClickHandler onMapClick={handleMapClick} />
                {position && <Marker position={[position.lat, position.lng]} icon={customIcon}>
                    <Popup>{location}</Popup>
                </Marker>}
            </MapContainer>
            <Autocomplete
                options={suggestions}
                getOptionLabel={(option) => option.label || ''} // Ensure label is always defined
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Map Based Suggestions"
                        variant="outlined"
                        style={{ marginBottom: '10px' }}
                        onChange={(e) => setLocation(e.target.value)}
                        value={location} // Use location state for input value
                    />
                )}
                onChange={handleLocationChange}
                isOptionEqualToValue={(option, value) => option.label === value} // Customize equality test
                style={{ width: '100%' }}
            />
            <Button
                variant="contained"
                color="primary"
                onClick={handleSearch}
                disabled={loading || !location} // Disable button while loading or if no location
                style={{ width: '30%', height:'55px',backgroundColor:"#043b5c", cursor:"pointer", color:"white" }}
            >
                {loading ? 'Loading...' : 'Search'}
            </Button>
        </GlassContainer>
    );
};

export default MapSearch;
