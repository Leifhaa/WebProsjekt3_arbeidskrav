import React, {useState, useContext} from 'react';
import {Card, CardImg} from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import {GameContext} from "../../context/GameContext";


export const GameItem = ({id, name, price, image}) => {
    const [show, setShow] = useState(false);

    const {game} = useContext(GameContext)
    const [gameState, setGame] = game

    const setSelectedGame = () => {
        //Create a new clone obj.
        setGame({id: id, name: name, price: price, image: image})
    }

    const hideModal = () => setShow(false)

    const handleDelete = () => {
        const url = `https://localhost:5001/games`
        axios.delete(`${url}/${id}`);
    }

    function descModal() {
        return (
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Name: {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Price: {price}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    return (
        <Col xs={12} sm={6} md={4} lg={3} xl={2}>

            <article>
                {descModal()}
                <Card>
                    <Card.Header>{name}</Card.Header>
                    <Card.Img src={require("../../assets/anonymous.png")}/>
                    <Card.Body>
                        <Card.Text>{name} {price}</Card.Text>
                    </Card.Body>
                    <Button onClick={setSelectedGame}>Update ship</Button>
                    <Card.Img variant="top" src={`https://localhost:5001/images/${image}`}/>
                    <Card.Link style={{cursor: "pointer"}} onClick={() => setShow(true)}>View more</Card.Link>
                    <Card.Footer style={{color: "red", cursor: "pointer"}} onClick={handleDelete}>Delete</Card.Footer>
                </Card>
            </article>
        </Col>
    )
}

GameItem.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
};

GameItem.defaultProps = {
    price: "599.99"
};
