import {Navbar} from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import {Link} from "react-router-dom";
import React from "react";

export const MainNavivation = () => {
    return (
        <Navbar bg="dark" variant="dark" className="mb-5">
            <Nav>
                <Nav.Link as={Link} to="/">Gaming2021</Nav.Link>
                <Nav.Link as={Link} to="/games">Games</Nav.Link>
                <Nav.Link as={Link} to="/admin">Admin</Nav.Link>
            </Nav>
        </Navbar>
    )
}