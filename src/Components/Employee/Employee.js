import React, {useState} from 'react';
import { Card } from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";


export const Employee = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClick = () => {
        props.removeEmployee(props.id);
    }

    function descModal(){
        return(
            <Modal show={show} onHide={handleClose}>
                 <Modal.Header closeButton>
                     <Modal.Title>Name: {props.name}</Modal.Title>
                 </Modal.Header>
                 <Modal.Body>Details: {props.description}</Modal.Body>
                 <Modal.Footer>
                     <Button variant="secondary" onClick={handleClose}>
                         Close
                    </Button>
                 </Modal.Footer>
            </Modal>
        )
    }

    return(
        <Col xs={ 12 } sm={ 6 } md={ 4 } lg={ 3 } xl={ 2 }>

            {descModal()}
             <Card>
                <Card.Header>{props.position}</Card.Header>
                <Card.Img src={require("../../assets/anonymous.png")}/>
                <Card.Body>
                    <Card.Text>{props.name} {props.surname}</Card.Text>
                </Card.Body>
                 <Card.Link style={{cursor: "pointer"}}  onClick={() => setShow(true)}>View more</Card.Link>
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
