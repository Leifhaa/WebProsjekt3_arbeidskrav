import React, {useEffect, useState} from 'react';
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
let tmpId = 0;





function App() {
  const [ employees, setEmployees ] = useState([]);
  const [ projects, setProjects ] = useState([]);

  const generateId = () => {
    tmpId++
    return tmpId
  }

  useEffect(() => {
    //Load user's from storage
    let storage = localStorage.getItem('employees')
    if (storage != null){
      let employees = JSON.parse(storage)
      //Re-generate ID's
      employees.forEach(e => e.id = generateId())
      setEmployees(employees)
    }
    else{
      //Generate default values
      setEmployees([
        { id:generateId(), name: "Michael", surname: "Samson", description: "A efficient worker who does everything he is asked!" },
        { id:generateId(), name: "Jordan", surname: "Smith" , description: "Lazy boy. But has much experience."},
        { id:generateId(), name: "Samuel", surname: "Schanwzky", description: "Knows mostly electricity work." },
      ])
    }
    //Generate default values
    setProjects([
      { id:generateId(), name: "Building a house", members: [1,2] },
      { id:generateId(), name: "Fixing electricity", members: [2,3] },
    ])
  },[]);


  const addNewEmployee = (name, surname, description) => {
    const added = {
      id:generateId(),
      name:name,
      surname:surname,
      description:description,
      img:surname
    }
    const newEmployees = [...employees, added]
    //Saving employee's in local storage for educational purposes. These would usually be stored in a database or in memory.
    localStorage.setItem('employees', JSON.stringify(newEmployees));

    //Combines previous employees with new employee
    setEmployees(newEmployees);
  }

  const removeEmployee= (id) => {
    //Improvement: Use map instead of array for employee's.
    var newEmployees = employees.filter(e => e.id !== id)

    localStorage.setItem('employees', JSON.stringify(newEmployees));
    setEmployees(newEmployees)
  }

  const addProject = (name) => {
    let newProject = {
      id:generateId(),
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
