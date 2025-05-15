/*==================================================
HomePageView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the home page.
================================================== */
import React from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(() => ({
  container: {
    textAlign: 'center',
    padding: '4rem 1rem',
  },
  title: {
    fontSize: '2.5rem',
    marginBottom: '2rem',
    color: '#333',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '2rem',
    flexWrap: 'wrap',
  },
  button: {
    minWidth: '200px',
    padding: '1rem 2rem',
    fontSize: '1.1rem',
    borderRadius: '8px',
  },
}));

const HomePageView = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Welcome to the Campus</h1>
      <div className={classes.buttonGroup}>
        <Link to="/campuses" style={{ textDecoration: 'none' }}>
          <Button
            className={classes.button}
            variant="contained"
            color="primary"
          >
            View All Campuses
          </Button>
        </Link>
        <Link to="/students" style={{ textDecoration: 'none' }}>
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
          >
            View All Students
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default HomePageView;
