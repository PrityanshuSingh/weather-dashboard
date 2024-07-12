import React, { createContext, useContext, useState } from 'react';

// Create the context
const AuthContext = createContext();

// Custom hook to use the context
export const useAuth = () => useContext(AuthContext);

// AuthProvider component to wrap your app with
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        const storedIsLoggedIn = sessionStorage.getItem('isLoggedIn');
        return storedIsLoggedIn ? JSON.parse(storedIsLoggedIn) : false;
    });
    const [authUsername, setAuthUsername] = useState(() => sessionStorage.getItem('authUsername') || '');

    const login = (username) => {
        setIsLoggedIn(true);
        setAuthUsername(username);
        sessionStorage.setItem('isLoggedIn', true);
        sessionStorage.setItem('authUsername', username);
    };

    const logout = () => {
        setIsLoggedIn(false);
        setAuthUsername('');
        sessionStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('authUsername');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout, authUsername, setAuthUsername }}>
            {children}
        </AuthContext.Provider>
    );
};
