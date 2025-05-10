/*==================================================
EditCampusContainer.js
================================================== */

// import React, { useState, useEffect } from 'react';
// import Header from './Header';
// import { Component } from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';

// import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
// import EditCampusView from '../views/EditCampusView';

// const EditCampusContainer = (props) => {
//     const { id } = props.match.params;

//     // State to store campus data and loading status
//     const [campus, setCampus] = useState({
//         name: '',
//         address: '',
//         description: '',
//         imageUrl: '',
//     });

//     useEffect(() => {
//         const loadCampus = async () => {
//             try {
//                 const campusData = await props.fetchCampus(id);
//                 setCampus(campusData);
//             } catch (error) {
//                 console.error('Error fetching campus:', error);
//             }
//         };
//         loadCampus();
//     }, [id]);

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setCampus({ ...campus, [name]: value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//             await props.editCampus(campus);
//             alert('Campus updated successfully!');
//             props.history.push(`/campus/${id}`);
//         } catch (error) {
//             console.error('Error updating campus:', error);
//         }
//     };

//     return (
//         <EditCampusView 
//             campus={campus}
//             handleChange={handleChange}
//             handleSubmit={handleSubmit}
//         />
//     );
// };

// const mapDispatch = (dispatch) => ({
//     fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
//     editCampus: (campus) => dispatch(editCampusThunk(campus)),
// });

// export default connect(null, mapDispatch)(EditCampusContainer);

import Header from './Header';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import EditCampusView from '../views/EditCampusView';
import { fetchCampusThunk, editCampusThunk } from '../../store/thunks';
//import { editCampus, fetchCampus } from '../../store/actions/actionCreators';

class EditCampusContainer extends Component {
    //intialize state
    constructor(props){
        super(props);
        this.state = {
            name: "",
            address: "",
            description:"",
            imageUrl: "",
            redirect: false,
            redirectId: null
        };
    }

    //fetch the campus when the component mounts
    async componentDidMount(){
        await this.props.fetchCampus(this.props.match.params.id);
        console.log("Fetched Campus:", this.props.campus);  // Log the campus data
        
        //update the state with the fetched campus data
        const {name,address,description,imageUrl} = this.props.campus;
        this.setState({name,address,description,imageUrl});
    }

    // componentDidUpdate(prevProps){
    //     if(prevProps.campus!== this.props.campus){
    //         const { name, address, description, imageUrl } = this.props.campus;
    //         this.setState({ name, address, description,imageUrl });
    //     }
    // }

    //capture input data when it's entered
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        });
    };

    //take action after user clicks the submit button
    handleSubmit = async (event,formData) => {
        event.preventDefault();

        let campus = {
            id:this.props.campus.id,
            // name: this.state.name,
            // address: this.state.address,
            // description: this.state.description,
            // imageUrl:this.state.imageUrl,
            name: formData.name,
            address:formData.address,
            description:formData.description,
            imageUrl:formData.imageUrl,
        };

        //update campus in backend database
        await this.props.editCampus(campus.id,campus);

        //update state and trigger redirect to the updated campus page
        this.setState({
            redirect:true,
            redirectId:campus.id,
        });
    };

    //unmount handler to clear redirect state
    componentWillUnmount(){
        this.setState({ redirect:false, redirectId:null});
    }

    //render edit campus input form
    render(){
        //redire to the updated campus page after submission
        if(this.state.redirect){
            return <Redirect to={`/campus/${this.state.redirectId}`} />;
        }
        return (
            <div>
                <Header />
                <EditCampusView
                    handleChange = {this.handleChange}
                    handleSubmit={this.handleSubmit}
                    campusName = {this.state.name}
                    campusAddress = {this.state.address}
                    campusDescription = {this.state.description}
                    campusImageUrl= {this.state.imageUrl}
                    campus={this.props.campus}
                />
            </div>
        );
    }
}

//map state from redux to component props
const mapState = (state) => {
    return {
        campus: state.campus,
    };
};

//map dispatch to props
const mapDispatch = (dispatch) => {
    return {
        fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
        editCampus: (id,campus) => dispatch(editCampusThunk(id,campus)),
    };
};

//export the connected component
export default connect(mapState,mapDispatch)(EditCampusContainer);