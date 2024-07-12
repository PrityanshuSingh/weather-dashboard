/** @jsxImportSource @emotion/react */
import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { css } from "@emotion/react";

const styles = {
  footer: css`
    top: auto;
    bottom: 0;
    background: rgba(4, 59, 92,1);
    backdrop-filter: blur(10px);
  `,
  content: css`
    flex-grow: 1;
    text-align: center;
  `
};

const Footer = () => {
  return (
    <AppBar position="static" css={styles.footer}>
      <Toolbar>
        <Typography variant="body1" css={styles.content}>
          &copy; 2024 Weather Dashboard. All rights reserved.
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
