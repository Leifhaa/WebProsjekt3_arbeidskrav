import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Home} from "./Components/Views/Home";
import {EmployeeView} from "./Components/Views/EmployeeView";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';

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




function App() {
  const [ employees, setEmployees ] = useState(employeeArray);

  const addNewEmployee = (newEmployee) => {
    //Combines previous employees with new employee
    setEmployees(...employees, newEmployee);
  }

  const removeEmployee= (id) => {
    employees.forEach()
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
