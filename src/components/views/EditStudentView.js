import React, { useState } from 'react';
import Button   from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  formContainer: {
    margin: '20px auto',
    padding: '20px',
    maxWidth: '500px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
  },
  formTitle: {
    marginBottom: '15px',
    fontWeight: 'bold',
    fontSize: '1.5rem',
    color: '#11153e',
  },
  field: {
    display: 'block',
    width: '80%',
    margin: '8px auto',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  select: {
    display: 'block',
    width: '84%',
    margin: '8px auto',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  error: {
    color: 'red',
    fontSize: '0.85rem',
    marginTop: '4px',
  },
  submitButton: {
    marginTop: '1.5rem',
  },
}));

export default function EditStudentView({
  campuses,
  firstname,
  lastname,
  email,
  imageUrl,
  gpa,
  campusId,
  handleChange,
  handleSubmit
}) {
  const classes = useStyles();
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!firstname.trim()) errs.firstname = 'First name is required';
    if (!lastname.trim())  errs.lastname  = 'Last name is required';
    if (!email.trim())     errs.email     = 'Email is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSubmit = e => {
    e.preventDefault();
    if (validate()) {
      handleSubmit(e);
    }
  };

  return (
    <div className={classes.formContainer}>
      <div className={classes.formTitle}>Edit Student Information</div>
      <form onSubmit={onSubmit}>
        <input
          className={classes.field}
          name="firstname"
          value={firstname}
          onChange={handleChange}
          placeholder="First Name"
        />
        {errors.firstname && <div className={classes.error}>{errors.firstname}</div>}

        <input
          className={classes.field}
          name="lastname"
          value={lastname}
          onChange={handleChange}
          placeholder="Last Name"
        />
        {errors.lastname && <div className={classes.error}>{errors.lastname}</div>}

        <input
          className={classes.field}
          name="email"
          type="email"
          value={email}
          onChange={handleChange}
          placeholder="Email"
        />
        {errors.email && <div className={classes.error}>{errors.email}</div>}

        <input
          className={classes.field}
          name="imageUrl"
          value={imageUrl}
          onChange={handleChange}
          placeholder="Image URL (optional)"
        />

        <input
          className={classes.field}
          name="gpa"
          type="number"
          step="0.1"
          min="0"
          max="4"
          value={gpa}
          onChange={handleChange}
          placeholder="GPA (0.0–4.0)"
        />

        <select
          className={classes.select}
          name="campusId"
          value={campusId}
          onChange={handleChange}
        >
          <option value="">— Select Campus —</option>
          {campuses.map(c => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>

        <Button
          className={classes.submitButton}
          variant="contained"
          color="primary"
          type="submit"
        >
          Update Student
        </Button>
      </form>
    </div>
  );
}
