import React from 'react';
import { Card } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import {PEmployeeList} from "./PEmployeeList";
import {Employee} from "../Employee/Employee";
import PropTypes from 'prop-types';


export const Project = (props) => {
    const handleClick = () => {
        props.removeProject(props.id);
    }

    return(
        <Col xs={ 12 } sm={ 10 } md={ 8 } lg={ 6 } xl={ 4 }>
            <Card>
                <Card.Header>Project: {props.name}</Card.Header>
                <Card.Body>
                    <p>Members:</p>
                    <PEmployeeList projectId={props.id} members={props.members} employees={props.employees} addMember={props.addMember} removeMember={props.removeMember} />
                </Card.Body>
                <Card.Footer style={{color:"red", cursor: "pointer"}} onClick={handleClick}>Delete project</Card.Footer>
            </Card>
        </Col>
    )
}

Project.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    members: PropTypes.array,
};