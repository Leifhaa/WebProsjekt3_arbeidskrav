import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export const PEmployee = (props) => {
    const handleAdd = () => {
        props.addMember(props.projectId,props.id)
    }

    const handleRemove = () => {
        props.removeMember(props.projectId, props.id)
    }

    return(
        <Row>
            <Col>{props.name}</Col>
            <Col>
                {props.members.includes(props.id) ?
                    <Button variant={"danger"} onClick={handleRemove}>Remove</Button> :
                    <Button variant={"success"} onClick={handleAdd}>Add</Button>
                }
            </Col>
        </Row>
    )
}