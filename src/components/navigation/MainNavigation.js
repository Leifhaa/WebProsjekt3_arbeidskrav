import {NavBar, Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import React from "react";

export const MainNavivation = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <Navbar.Brand>Playstation's unofficial site</Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/employees">Games</Nav.Link>
                <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
            </Nav>
        </Navbar>
    )
}