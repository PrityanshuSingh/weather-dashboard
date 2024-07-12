/** @jsxImportSource @emotion/react */
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CloudIcon from '@mui/icons-material/Cloud';
import { css } from '@emotion/react';

const styles = {
    appBar: css`
        background: rgba(4, 59, 92, 1);
        backdrop-filter: blur(10px);
    `,
    title: css`
        flex-grow: 1;
        display: flex;
        align-items: center;
        color: inherit;
        text-decoration: none;
    `,
    link: css`
        text-decoration: none;
        color: inherit;
        margin: 0 16px;
        &:hover {
            text-decoration: underline;
        }
    `,
};

const Navbar = () => {
    const { isLoggedIn, authUsername} = useAuth();

    return (
        <AppBar position="sticky" css={styles.appBar}>
            <Toolbar>
                <Link to="/" css={styles.title}>
                    <IconButton edge="start" color="inherit" aria-label="weather">
                        <CloudIcon />
                    </IconButton>
                    <Typography variant="h6">Weather Dashboard</Typography>
                </Link>
                {isLoggedIn ? (
                    <Link to="/profile" css={styles.link}>
                        <Typography variant="h6">{authUsername}</Typography>
                    </Link>
                ) : (
                    <Link to="/login" css={styles.link}>
                        <Typography variant="h6">Login</Typography>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;
