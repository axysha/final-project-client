/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
// src/components/views/StudentView.js
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { Link, useHistory } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",               
    flexDirection: "column",
    alignItems: "center",
    padding: "2rem",
  },
  name: {
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  avatar: {
    width: 160,                   
    height: 160,
    borderRadius: "50%",
    objectFit: "cover",
    marginBottom: "1.5rem",
    backgroundColor: "#eee",
  },
  info: {
    textAlign: "center",         
    marginBottom: "0.5rem",
  },
  label: {
    fontWeight: "bold",
    marginRight: "0.3rem",
  },
  buttonRow: {
    marginTop: "2rem",             
    display: "flex",
    gap: "1rem",
  }
}));

const StudentView = ({ student, deleteStudent }) => {
  const classes = useStyles();
  const history = useHistory();

  // While loading data
  if (!student || !student.id) {
    return <p className={classes.container}>Loading student…</p>;
  }

  const {
    id,
    firstname,
    lastname,
    email,
    imageUrl,
    gpa,
    campus,
  } = student;

  // 1. Avatar: fallback to public/student.png if no imageUrl
  const imgSrc = imageUrl?.trim() || "/student.png";

  // 2. Format GPA
  const gpaNum = parseFloat(gpa);
  const gpaDisplay = Number.isFinite(gpaNum) ? gpaNum.toFixed(2) : "N/A";

  return (
    <div className={classes.container}>
      {/* Student’s full name */}
      <h1 className={classes.name}>
        {firstname} {lastname}
      </h1>

      {/* Avatar */}
      <img
        src={imgSrc}
        alt={`${firstname} ${lastname}`}
        className={classes.avatar}
      />

      {/* Email */}
      <p className={classes.info}>
        <span className={classes.label}>Email:</span> {email}
      </p>

      {/* GPA */}
      <p className={classes.info}>
        <span className={classes.label}>GPA:</span> {gpaDisplay}
      </p>

      {/* Campus link or “Not enrolled” */}
      <p className={classes.info}>
        <span className={classes.label}>Attends:</span>{" "}
        {campus
          ? <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
          : "Not enrolled"}
      </p>

      {/* Edit and Delete buttons */}
      <div className={classes.buttonRow}>
        <Button
          variant="outlined"
          onClick={() => history.push(`/student/${id}/edit`)}
        >
          Edit Student Information
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            deleteStudent(id);
            history.push("/students");
          }}
        >
          Delete Student
        </Button>
      </div>
    </div>
  );
};

export default StudentView;
