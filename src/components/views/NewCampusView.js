/*==================================================
NewCampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the new campus page.
================================================== */
// import Button from '@material-ui/core/Button';
// import Typography from '@material-ui/core/Typography';
// import { makeStyles } from '@material-ui/core/styles';

// //Create styling for the input form
// const useStyles = makeStyles(() => ({
//     formContainer: {
//       width: '500px',
//       backgroundColor: '#f0f0f5',
//       borderRadius: '5px',
//       margin: 'auto',
//     },
//     title: {
//       flexGrow: 1,
//       textAlign: 'left',
//       textDecoration: 'none',
//     },
//     customizeAppBar: {
//       backgroundColor: '#11153e',
//       shadows: ['none'],
//     },
//     formTitle: {
//       backgroundColor: '#c5c8d6',
//       marginBottom: '15px',
//       textAlign: 'center',
//       borderRadius: '5px 5px 0px 0px',
//       padding: '3px',
//     },
// }));


// const NewCampusView = ({ handleChange, handleSubmit }) => {
//     const classes = useStyles();
  
//     return (
//       <div>
//         <h1>New Campus</h1>
  
//         <div className={classes.root}>
//           <div className={classes.formContainer}>
//             <div className={classes.formTitle}>
//               <Typography 
//                 style={{ 
//                   fontWeight: 'bold', 
//                   fontFamily: 'Courier, sans-serif', 
//                   fontSize: '20px', 
//                   color: '#11153e' 
//                 }}
//               >
//                 Add a Campus
//               </Typography>
//             </div>
//             <form style={{ textAlign: 'center' }} onSubmit={(e) => handleSubmit(e)}>
//               <label style={{ color: '#11153e', fontWeight: 'bold' }}>Name: </label>
//               <input type="text" name="name" onChange={(e) => handleChange(e)} />
//               <br />
//               <br />
  
//               <label style={{ color: '#11153e', fontWeight: 'bold' }}>Address: </label>
//               <input type="text" name="address" onChange={(e) => handleChange(e)} />
//               <br />
//               <br />
  
//               <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
//               <input type="text" name="description" onChange={(e) => handleChange(e)} />
//               <br />
//               <br />
  
//               <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
//               <input type="text" name="imageUrl" onChange={(e) => handleChange(e)} />
//               <br />
//               <br />
  
//               <Button variant="contained" color="primary" type="submit">
//                 Submit
//               </Button>
//               <br />
//               <br />
//             </form>
//           </div>
//         </div>
//       </div>
//     );
// };
  
// export default NewCampusView;


import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// Create styling for the input form
const useStyles = makeStyles(() => ({
    formContainer: {
      width: '500px',
      backgroundColor: '#f0f0f5',
      borderRadius: '5px',
      margin: 'auto',
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      textDecoration: 'none',
    },
    formTitle: {
      backgroundColor: '#c5c8d6',
      marginBottom: '15px',
      textAlign: 'center',
      borderRadius: '5px 5px 0px 0px',
      padding: '3px',
    },
    errorMessage: {
      color: 'red',
      fontSize: '12px',
      marginTop: '5px',
    },
}));

const NewCampusView = ({ handleChange, handleSubmit }) => {
    const classes = useStyles();

    // State to store error messages
    const [errors, setErrors] = useState({});

    // Simple form validation
    const validateForm = (formData) => {
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = 'Campus name is required.';
        }

        if (!formData.address) {
            newErrors.address = 'Campus address is required.';
        }

        if (!formData.description) {
            newErrors.description = 'Campus description is required.';
        }

        if (formData.imageUrl && !/^https?:\/\/[^\s]+$/.test(formData.imageUrl)) {
            newErrors.imageUrl = 'Please enter a valid image URL.';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Form submission handler
    const handleFormSubmit = (e) => {
        e.preventDefault();  // Prevent form refresh

        const formData = {
            name: e.target.name.value,
            address: e.target.address.value,
            description: e.target.description.value,
            imageUrl: e.target.imageUrl.value,
        };

        if(validateForm(formData)){
            handleSubmit(e);
        }
    };

    return (
        <div>
            <h1>New Campus</h1>

            <div className={classes.formContainer}>
                <div className={classes.formTitle}>
                    <Typography
                        style={{
                            fontWeight: 'bold',
                            fontFamily: 'Courier, sans-serif',
                            fontSize: '20px',
                            color: '#11153e',
                        }}
                    >
                        Add a Campus
                    </Typography>
                </div>
                <form style={{ textAlign: 'center' }} onSubmit={handleFormSubmit}>
                    <label style={{ color: '#11153e', fontWeight: 'bold' }}>Name: </label>
                    <input type="text" name="name" onChange={handleChange} />
                    {errors.name && <div className={classes.errorMessage}>{errors.name}</div>}
                    <br /><br />

                    <label style={{ color: '#11153e', fontWeight: 'bold' }}>Address: </label>
                    <input type="text" name="address" onChange={handleChange} />
                    {errors.address && <div className={classes.errorMessage}>{errors.address}</div>}
                    <br /><br />

                    <label style={{ color: '#11153e', fontWeight: 'bold' }}>Description: </label>
                    <input type="text" name="description" onChange={handleChange} />
                    {errors.description && <div className={classes.errorMessage}>{errors.description}</div>}
                    <br /><br />

                    <label style={{ color: '#11153e', fontWeight: 'bold' }}>Image URL: </label>
                    <input type="text" name="imageUrl" onChange={handleChange} />
                    {errors.imageUrl && <div className={classes.errorMessage}>{errors.imageUrl}</div>}
                    <br /><br />

                    <Button variant="contained" color="primary" type="submit">
                        Submit
                    </Button>
                    <br /><br />
                </form>
            </div>
        </div>
    );
};

export default NewCampusView;
