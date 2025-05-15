/*==================================================
Header.js

It contains the Header component to be displayed on every page.
The header contains navigation links to every other page.
================================================== */
// Import "material" library for building UI with React components
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// Define styling for the header
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
    textAlign: 'left',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
    fontSize: '35px',
    color: '#1E2749'
  },
  appBar: {
    backgroundColor: '#E4D9FF',
    boxShadow: 'none',
  },
  link: {
    textDecoration: 'none',
    marginRight: theme.spacing(1)
  }
}));

// Header component, displayed on every page
// Links to every other page
const Header = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>

          {/* App title */}
          <Typography variant="h6" className={classes.title}>
            Campus Management System
          </Typography>

          {/* Home button */}
          <Link to="/" className={classes.link}>
            <Button variant="contained" color="primary">
              Home
            </Button>
          </Link>

          {/* → ADD “All Campuses” button here */}
          <Link to="/campuses" className={classes.link}>
            <Button variant="contained" color="primary">
              All Campuses
            </Button>
          </Link>

          {/* → ADD “All Students” button here */}
          <Link to="/students" className={classes.link}>
            <Button variant="contained" color="primary">
              All Students
            </Button>
          </Link>

        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;