import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import Alert from '../../microInteraction/Alert'; // Import Alert component

const Register = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null); // State for displaying alerts

    const handleRegister = () => {
        // Simulate registration logic (backend not connected)
        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            setAlert({
                type: 'error',
                message: 'Passwords do not match.',
                position: 'bottom-right',
                duration: 4000,
            });
        } else {
            // Simulate successful registration (login with registered user)
            login(username); // Update AuthContext to set isLoggedIn to true and set username
            setAlert({
                type: 'success',
                message: 'Registration successful. Due to our backend servers down, sign-in is currently unavailable. Please use test user data to login.',
                position: 'bottom-right',
                duration: 5000,
            });
            navigate('/'); // Redirect to home page or profile page after registration/login
        }
    };

    return (
        <div style={{ maxWidth: '90vw', margin: 'auto', padding: '20px' }}>
            <Typography variant="h3" align="left" style={{ marginTop: "50px", color: "#043b5c", fontWeight: "600" }} gutterBottom>Register</Typography>
            <TextField
                label="Username"
                variant="outlined"
                margin="normal"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleRegister}
                style={{ width: '100%', marginTop: '20px', backgroundColor: "#043b5c", cursor: "pointer", color: "white" }}
            >
                Register
            </Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Already have an account? <Link to="/login">Login here</Link>
            </Typography>
            {alert && <Alert {...alert} />} {/* Display the alert */}
        </div>
    );
};

export default Register;
