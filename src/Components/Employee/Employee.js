import React from 'react';
import { Card } from 'react-bootstrap';

export const Employee = (props) => {
    const handleClick = () => {
        props.removeEmployee(props.id);
    }

    return(
            <Card>
                <Card.Header>Employee</Card.Header>
                <Card.Img src={require("../../assets/anonymous.png")}/>
                <Card.Body>
                    <Card.Text>{props.name} {props.surname}</Card.Text>
                </Card.Body>
                <Card.Footer style={{color:"red", cursor: "pointer"}} onClick={handleClick}>Delete</Card.Footer>
            </Card>
    )
}
