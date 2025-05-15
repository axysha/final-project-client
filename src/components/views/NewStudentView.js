/*==================================================
NewStudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new student page.
================================================== */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
  formContainer:{  
    width: '500px',
    backgroundColor: '#f0f0f5',
    borderRadius: '5px',
    margin: 'auto',
    padding: '1rem'
  },
  formTitle:{
    backgroundColor:'#c5c8d6',
    marginBottom: '15px',
    textAlign: 'center',
    borderRadius: '5px 5px 0px 0px',
    padding: '8px',
    fontWeight: 'bold',
    fontSize: '20px',
    color: '#11153e',
    fontFamily: 'Courier, sans-serif'
  },
  field: {
    display: 'block',
    margin: '0.5rem 0'
  },
  label: {
    fontWeight: 'bold',
    color: '#11153e',
    marginRight: '0.5rem'
  },
  select: {     
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem'
  },
  submitButton: {
    padding: '8px 16px',
    fontSize: '1rem',
    backgroundColor: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  }
}));

const NewStudentView = ({
  campuses,
  firstname,
  lastname,
  email,
  imageUrl,
  gpa,
  campusId,
  handleChange,
  handleSubmit
}) => {
  const classes = useStyles();

  return (
    <div>
      <h1>New Student</h1>
      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          Add a Student
        </div>
        <form onSubmit={handleSubmit}>
          <div className={classes.field}>
            <label className={classes.label} htmlFor="firstname">
              First Name:
            </label>
            <input
              id="firstname"
              type="text"
              name="firstname"
              value={firstname}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="lastname">
              Last Name:
            </label>
            <input
              id="lastname"
              type="text"
              name="lastname"
              value={lastname}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="email">
              Email:
            </label>
            <input
              id="email"
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              required
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="imageUrl">
              Image URL:
            </label>
            <input
              id="imageUrl"
              type="url"
              name="imageUrl"
              value={imageUrl}
              onChange={handleChange}
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="gpa">
              GPA:
            </label>
            <input
              id="gpa"
              type="number"
              name="gpa"
              step="0.1"
              min="0"
              max="4"
              value={gpa}
              onChange={handleChange}
            />
          </div>

          <div className={classes.field}>
            <label className={classes.label} htmlFor="campusId">Campus:</label>
            <select
              id="campusId"
              name="campusId"
              value={campusId}
              onChange={handleChange}
              className={classes.select}
            >
              <option value="">— Select a campus —</option>
              {campuses.map(c => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <button type="submit" className={classes.submitButton}>
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewStudentView;
