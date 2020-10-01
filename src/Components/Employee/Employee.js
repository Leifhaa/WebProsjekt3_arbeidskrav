import React from 'react';
import { Card } from 'react-bootstrap';
import Col from "react-bootstrap/Col";

export const Employee = (props) => {
    return(
            <Card>
                <Card.Header>Employee</Card.Header>
                <Card.Img src={require("../../assets/anonymous.png")}/>
                <Card.Body>
                    <Card.Text>{props.name} {props.surname}</Card.Text>
                </Card.Body>
                <Card.Footer style={{color:"red"}} onClick={() => props.removeEmployee(props.id)}>Delete</Card.Footer>
            </Card>
    )
}
