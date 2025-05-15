import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Header from './Header';
import EditStudentView from '../views/EditStudentView';
import {
  fetchAllCampusesThunk,
  fetchStudentThunk,
  editStudentThunk
} from '../../store/thunks';

class EditStudentContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      imageUrl: '',
      gpa: '',
      campusId: '',
      redirect: false
    };
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    this.props.fetchAllCampuses();
    this.props.fetchStudent(id);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.student?.id !== this.props.student?.id &&
      this.props.student?.id
    ) {
      const { firstname, lastname, email, imageUrl, gpa, campus } = this.props.student;
      this.setState({
        firstname: firstname  || '',
        lastname:  lastname   || '',
        email:     email      || '',
        imageUrl:  imageUrl   || '',
        gpa:       gpa        || '',
        campusId:  campus?.id?.toString() || ''
      });
    }
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleSubmit = async e => {
    e.preventDefault();
    const { firstname, lastname, email, imageUrl, gpa, campusId } = this.state;
    const id = this.props.match.params.id;
    const payload = {
      id,
      firstname,
      lastname,
      email,
      imageUrl: imageUrl.trim() || '/student.png',
      gpa:       parseFloat(gpa) || 0,
      campusId:  campusId || null
    };
    await this.props.editStudent(payload);
    this.setState({ redirect: true });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={`/student/${this.props.match.params.id}`} />;
    }
    return (
      <div>
        <Header />
        <EditStudentView
          {...this.state}
          campuses={this.props.campuses}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

const mapState = state => ({
  campuses: state.allCampuses,
  student:  state.student
});

const mapDispatch = dispatch => ({
  fetchAllCampuses: ()      => dispatch(fetchAllCampusesThunk()),
  fetchStudent:     id      => dispatch(fetchStudentThunk(id)),
  editStudent:      stud    => dispatch(editStudentThunk(stud))
});

export default connect(mapState, mapDispatch)(EditStudentContainer);
