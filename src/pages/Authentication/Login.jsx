import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import testUserData from '../../data/testUser.json'; // Assuming you have test user data
import { useAuth } from '../../context/AuthContext';
import Alert from '../../microInteraction/Alert'; // Import Alert component

const Login = () => {
    const { login } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [alert, setAlert] = useState(null); // State for displaying alerts

    const handleLogin = () => {
        const user = testUserData.find(user => user.username === username && user.password === password);

        if (user) {
            login(username); // Update AuthContext to set isLoggedIn to true and set username
            setAlert({
                type: 'success',
                message: 'Logged in successfully!',
                position: 'bottom-right',
                duration: 5000,
            });
            navigate('/'); // Redirect to home page or profile page
        } else {
            setError('Invalid username or password.');
            setAlert({
                type: 'error',
                message: 'Invalid username or password.',
                position: 'bottom-right',
                duration: 4000,
            });
        }
    };

    return (
        <div style={{ maxWidth: '90vw', margin: 'auto', padding: '20px' }}>
            <Typography variant="h3" align="left" style={{ marginTop: "50px", color: "#043b5c", fontWeight: "600" }} gutterBottom>Login</Typography>
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
            {error && <Typography variant="body2" color="error">{error}</Typography>}
            <Button
                variant="contained"
                color="primary"
                onClick={handleLogin}
                style={{ width: '100%', marginTop: '20px', backgroundColor: "#043b5c", cursor: "pointer", color: "white" }}
            >
                Login
            </Button>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
                Don't have an account? <Link to="/signin">Register here</Link>
            </Typography>
            {alert && <Alert {...alert} />} {/* Display the alert */}
        </div>
    );
};

export default Login;
