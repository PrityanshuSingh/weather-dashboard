// App.jsx

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login";
import Signin from "./pages/Authentication/Signin"
import { AuthProvider } from "./context/AuthContext"; 
import Profile from "./pages/Profile/Profile";

const themeLight = createTheme({
    palette: {
        background: {
            default: "#e4f0e2",
        },
        text: {
            primary: "#222222", // Text color for light theme
            secondary: "#333333", // Secondary text color for light theme
        },
    },
});

const themeDark = createTheme({
    palette: {
        background: {
            default: "#222222",
        },
        text: {
            primary: "#ffffff", // Text color for dark theme
        },
    },
});

const App = () => {
    const [light, setLight] = useState(true);

    const theme = light ? themeLight : themeDark;

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <AuthProvider>
                    <div
                        style={{
                            minHeight: "100vh",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Navbar />
                        <div
                            style={{
                                flex: 1,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                background:
                                    "linear-gradient(135deg, #ffffff 10%, #e1f5fe 90%)",
                                backgroundSize: "cover", 
                                backgroundRepeat: "no-repeat",
                            }}
                        >
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signin" element={<Signin />} />
                                <Route path="/profile" element={<Profile/>} />

                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </AuthProvider>
            </Router>
        </ThemeProvider>
    );
};

export default App;
