import { useState, useEffect } from "react";
//import { Button, Typography } from "@mui/material";
//import { makeStyles } from "@mui/styles";
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
  formContainer: {
    margin: "20px",
    padding: "20px",
    border: "1px solid #ddd",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  formTitle: {
    marginBottom: "10px",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
    marginTop: "5px",
  },
}));

const EditCampusView = ({ campus, handleSubmit }) => {
  const classes = useStyles();

  //DEBUG
  console.log("Campus Prop:", campus);

  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    description: "",
    imageUrl: "",
  });

  // State to store error messages
  const [errors, setErrors] = useState({});

  // Load campus data into the form when component mounts
  useEffect(() => {
    if (campus) {
      setFormData({
        name: campus.name || "",
        address: campus.address || "",
        description: campus.description || "",
        imageUrl: campus.imageUrl || "",
      });
    }
  }, [campus]);

  // Handle form changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Simple form validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Campus name is required.";
    if (!formData.address) newErrors.address = "Campus address is required.";
    if (!formData.description) newErrors.description = "Campus description is required.";
    if (formData.imageUrl && !/^https?:\/\/[^\s]+$/.test(formData.imageUrl)) {
      newErrors.imageUrl = "Please enter a valid image URL.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleFormSubmit = (e) => {
    e.preventDefault(); // Prevent form refresh

    if (validateForm()) {
      handleSubmit(e,formData); // Pass the updated data to the submit handler
    }
  };

  return (
    <div>
      <h1>Edit Campus</h1>

      <div className={classes.formContainer}>
        <div className={classes.formTitle}>
          <Typography
            style={{
              fontWeight: "bold",
              fontFamily: "Courier, sans-serif",
              fontSize: "20px",
              color: "#11153e",
            }}
          >
            Update Campus Information
          </Typography>
        </div>
        <form style={{ textAlign: "center" }} onSubmit={handleFormSubmit}>
          <label style={{ color: "#11153e", fontWeight: "bold" }}>Name: </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && (
            <div className={classes.errorMessage}>{errors.name}</div>
          )}
          <br /><br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Address: </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
          />
          {errors.address && (
            <div className={classes.errorMessage}>{errors.address}</div>
          )}
          <br /><br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Description: </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          {errors.description && (
            <div className={classes.errorMessage}>{errors.description}</div>
          )}
          <br /><br />

          <label style={{ color: "#11153e", fontWeight: "bold" }}>Image URL: </label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          {errors.imageUrl && (
            <div className={classes.errorMessage}>{errors.imageUrl}</div>
          )}
          <br /><br />

          <Button variant="contained" color="primary" type="submit">
            Update Campus
          </Button>
          <br /><br />
        </form>
      </div>
    </div>
  );
};

export default EditCampusView;
