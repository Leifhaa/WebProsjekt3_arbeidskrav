import React from 'react';
import { Card } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';


export const Employee = (props) => {
    const handleClick = () => {
        props.removeEmployee(props.id);
    }

    return(
        <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>
             <Card>
                <Card.Header>{props.position}</Card.Header>
                <Card.Img src={require("../../assets/anonymous.png")}/>
                <Card.Body>
                    <Card.Text>{props.name} {props.surname}</Card.Text>
                </Card.Body>
                <Card.Footer style={{color:"red", cursor: "pointer"}} onClick={handleClick}>Delete {props.img}</Card.Footer>
            </Card>
        </Col>
    )
}

Employee.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    surname: PropTypes.string.isRequired,
};

Employee.defaultProps = {
    position: "Employee"
};
