import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Home} from "./Components/Views/Home";
import {Employees} from "./Components/Views/Employees";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Projects} from "./Components/Views/Projects";

//Variable which mocks a database's auto incremental
let idGenerator = 0;

const GenerateId = () => {
  return ++idGenerator;
}


//Default employees
let employeeArray = [
  { id:GenerateId(), name: "Michael", surname: "Samson" },
  { id:GenerateId(), name: "Jordan", surname: "Smith" },
  { id:GenerateId(), name: "Samuel", surname: "Schanwzky" },
];

//Default projects
//Members - id ID of employees which is assigned to the project
let projectsArr = [
  { id:GenerateId(), name: "Building a house", members: [1,2] },
  { id:GenerateId(), name: "Fixing electricity", members: [2,3] },
];




function App() {
  const [ employees, setEmployees ] = useState(employeeArray);
  const [ projects, setProjects ] = useState(projectsArr);

  const addNewEmployee = (name, surname) => {
    const newEmployee = {
      id:GenerateId(),
      name:name,
      surname:surname,
      img:surname
    }
    //Combines previous employees with new employee
    setEmployees([...employees, newEmployee]);
  }

  const removeEmployee= (id) => {
    //Improvement: Use map instead of array for employee's.
    var newEmployees = employees.filter(e => e.id !== id)
    setEmployees(newEmployees)
  }

  const addProject = (name) => {
    let newProject = {
      id:GenerateId(),
      name:name,
      members:[]
    }
    setProjects([...projects,newProject])
  }

  const removeProject= (id) => {
    var newProjects = projects.filter(e => e.id !== id)
    setProjects(newProjects)
  }

  const addMember = (projectId, id) => {
    //Clone
    let tmpProjects = [...projects]
    //Find project by id
    let editProj = tmpProjects.filter(o => { return o.id === projectId })
    //Add new member
    editProj[0].members.push(id)

    setProjects(tmpProjects)
  }

  const removeMember = (projectId, id) => {
    //Clone
    let tmpProjects = [...projects]
    //Find project by id
    let editProj = tmpProjects.filter(o => { return o.id === projectId })[0]

    //Find and remove member
    const idx = editProj.members.indexOf(id);
    if (idx > -1) {
      editProj.members.splice(idx, 1);
    }

    setProjects(tmpProjects)
  }


  return (
    <div className="App">
        <BrowserRouter>
          <Navbar bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand>Employee panel V3</Navbar.Brand>
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/employees">Employees</Nav.Link>
                <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
              </Nav>
          </Navbar>
          <Container>
            <Switch>
              <Route exact path="/" component={ Home }></Route>
              <Route path="/employees">
                <Employees employees={employees} addEmployee={addNewEmployee} removeEmployee={removeEmployee}></Employees>
              </Route>
              <Route path="/projects">
                <Projects projects={projects} addProject={addProject} removeProject={removeProject} employees={employees} addMember={addMember} removeMember={removeMember}></Projects>
              </Route>
            </Switch>
          </Container>
        </BrowserRouter>
    </div>
  );
}



export default App;
