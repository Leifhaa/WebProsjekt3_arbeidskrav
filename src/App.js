import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Home} from "./Components/Views/Home";
import {EmployeeView} from "./Components/Views/EmployeeView";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

//Default employees
let employeeArray = [
  { title: "Michael", position: "Samson" },
  { title: "Jordan", position: "Smith" },
  { title: "Samuel", position: "Schanwzky" },
];


function App() {
  const [ employees, setEmployees ] = useState(employeeArray);

  const addNewEmployee = (newEmployee) => {
    //Combines previous employees with new employee
    setEmployees(...employees, newEmployee);
  }


  return (
    <div className="App">
        <BrowserRouter>
          <Navbar bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand>Employee panel V3</Navbar.Brand>
              <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/employees">Om oss</Nav.Link>
              </Nav>
          </Navbar>
          <Container>
            <Switch>
              <Route exact path="/" component={ Home }></Route>
              <Route path="/employees">
                <EmployeeView employees={employees} addEmployee={addNewEmployee}></EmployeeView>
              </Route>
            </Switch>
          </Container>
        </BrowserRouter>
    </div>
  );
}



export default App;
