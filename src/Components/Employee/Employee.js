import React from 'react';
import { Card } from 'react-bootstrap';

export const Employee = (props) => {
    return(
        <Card>
            <Card.Img src={require("../../assets/anonymous.png")}/>
            <Card.Body>
                <Card.Title>{props.name}</Card.Title>
                <Card.Text>Position : {props.position}</Card.Text>
            </Card.Body>
        </Card>
    )
}
