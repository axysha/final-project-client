/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus,deleteCampus} = props;

  // Delete handler function
  const handleDelete = async () => {
    await deleteCampus(campus.id);  // Call the delete function from props
    alert("Campus deleted successfully!");
    window.location.href = "/campuses";  // Redirect to All Campuses view
  };
  
  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} height="200" width="200" alt="college campus"/>
      <p>{campus.address}</p>
      <p>{campus.description}</p>

      {/* {campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>             
          </div>
        );
      })} */}

      {campus.students.length ? (
        campus.students.map(student => {
          let name = student.firstname + " " + student.lastname;
          return (
            <div key={student.id}>
              <Link to={`/student/${student.id}`}>
                <h2>{name}</h2>
              </Link>             
            </div>
          );
        })
      ) : (
        <p>No students enrolled at this campus.</p>
      )}

      {/* Delete Campus Button */}
      <button onClick={handleDelete}>Delete Campus</button>

    </div>
  );
};

export default CampusView;