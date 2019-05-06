import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './index.css';
import Login  from './components/auth/Login';
import Register  from './components/auth/Register';
import Subject from './components/subject/Subject';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
//import NotFound from './components/common/NotFound';
import Home from './components/home/Home';
import AddSubject from './components/subject/partials/AddSubject';
import Student from './components/student/Student';
import UpdateSubject from './components/subject/partials/UpdateSubject';
import AddStudent from './components/student/partials/AddStudent';
import UpdateStudent from './components/student/partials/UpdateStudent';
import Teacher from './components/teacher/Teacher';
import UpdateTeacher from './components/teacher/partials/UpdateTeacher';
import AddTeacher from './components/teacher/partials/AddTeacher';
import Parent from './components/parents/Parent';
import AddParent from './components/parents/partials/AddParent';
import UpdateParent from './components/parents/partials/UpdateParent';
import Class from './components/class/Class';
import AddClass from './components/class/partials/AddClass';
import UpdateClass from './components/class/partials/UpdateClass';
import Mark from './components/mark/Mark';
// import AddExistingSubject from './components/teacher/partials/AddExistingSubject';

class App extends Component {
  render() {
    return (
        <Router>
        <Fragment>
          <Header></Header>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/subjects" component={Subject} /> 
            <Route exact path="/addSubject" component={AddSubject} />
            <Route exact path="/updateSubject/:id" component={UpdateSubject} />
            <Route exact path="/" component={Home} />
            <Route exact path="/students" component={Student} />
            <Route exact path="/addStudent" component={AddStudent} />
            <Route exact path="/updateStudent/:id" component={UpdateStudent} />
            <Route exact path="/teachers" component={Teacher} />
            <Route exact path="/addTeacher" component={AddTeacher} />
            <Route exact path="/updateTeacher/:id" component={UpdateTeacher} />
            <Route exact path="/parents" component={Parent} />
            <Route exact path="/addParent" component={AddParent} />
            <Route exact path="/updateParent/:id" component={UpdateParent} />
            <Route exact path="/classes" component={Class} />
            <Route exact path="/addClass" component={AddClass} />
            <Route exact path="/updateClass/:id" component={UpdateClass} />
            <Route exact path="/marks" component={Mark} />
           {/* <Route exact path="/addExistingSubject/:id" component={AddExistingSubject}/>  */}
            {/* <Route component={NotFound} /> */}
          </Switch>
          <Footer></Footer>
      </Fragment>
    </Router>
    );
  }
}

export default App;
