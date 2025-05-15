/*==================================================
NewStudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import NewCampusView from '../views/NewCampusView';
import { addCampusThunk } from '../../store/thunks';

class NewCampusContainer extends Component {
    // Initialize state
    constructor(props) {
      super(props);
      this.state = {
        name: "",
        address: "",
        description: "",
        imageUrl: "",
        redirect: false,
        redirectId: null,
      };
    }
  
    // Capture input data when it is entered
    handleChange = (event) => {
      this.setState({
        [event.target.name]: event.target.value,
      });
    };
  
    // Take action after user clicks the submit button
    handleSubmit = async (event) => {
      event.preventDefault();  // Prevent browser reload/refresh after submit.
  
      const defaultImageUrl = "https://s29068.pcdn.co/wp-content/uploads/campus-shot-768x432.jpg.optimal.jpg";

      let campus = {
        name: this.state.name,
        address: this.state.address,
        description: this.state.description,
        imageUrl: this.state.imageUrl || defaultImageUrl,
      };
  
      // Add new campus in back-end database
      let newCampus = await this.props.addCampus(campus);
  
      // Update state and trigger redirect to show the new campus
      this.setState({
        name: "",
        address: "",
        description: "",
        imageUrl: "",
        redirect: true,
        redirectId: newCampus.id,
      });
    };
  
    // Unmount when the component is being removed from the DOM:
    componentWillUnmount() {
      this.setState({ redirect: false, redirectId: null });
    }
  
    // Render new campus input form
    render() {
      // Redirect to new campus page after submit
      if (this.state.redirect) {
        return <Redirect to={`/campus/${this.state.redirectId}`} />;
      }
  
      // Display the input form via the corresponding View component
      return (
        <div>
          <Header />
          <NewCampusView 
            handleChange={this.handleChange} 
            handleSubmit={this.handleSubmit} 
          />
        </div>
      );
    }
  }
  
  // Map dispatch to props
  const mapDispatch = (dispatch) => {
    return {
      addCampus: (campus) => dispatch(addCampusThunk(campus)),
    };
  };
  
  // Export store-connected container
export default connect(null, mapDispatch)(NewCampusContainer);



 