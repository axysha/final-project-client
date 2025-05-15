// src/App.js
import "./App.css";

// Router
import { Switch, Route } from "react-router-dom";

// Containers
import {
  HomePageContainer,
  CampusContainer,
  StudentContainer,
  AllCampusesContainer,
  AllStudentsContainer,
  NewStudentContainer,
  NewCampusContainer,
  EditCampusContainer,
  EditStudentContainer   
} from './components/containers';

const App = () => {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={HomePageContainer} />

        {/* campuses */}
        <Route exact path="/campuses" component={AllCampusesContainer} />
        <Route exact path="/newcampus" component={NewCampusContainer} />
        <Route exact path="/campus/:id" component={CampusContainer} />
        <Route exact path="/campus/:id/edit" component={EditCampusContainer} />

        {/* students */}
        <Route exact path="/students" component={AllStudentsContainer} />
        <Route exact path="/newstudent" component={NewStudentContainer} />
        <Route exact path="/student/:id" component={StudentContainer} />

        {/* ← new edit-student route */}
        <Route exact path="/student/:id/edit" component={EditStudentContainer} />
      </Switch>
    </div>
  );
};

export default App;

