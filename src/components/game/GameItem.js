import React, {useState, useContext} from 'react';
import {Card, CardImg} from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import axios from 'axios';
import {GameContext} from "../../context/GameContext";
import styled, { css } from 'styled-components'
import {GameRating} from "./GameRating";

const StyledCol = styled(Col)`
   .game-title{
     padding:10px;
     font-size:20px;
   }
    
   .game-price{
     font-size:30px;
   }
    
  .game-item-card:hover {
    transform: scale(1.02); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
    cursor: pointer;
  }
  .game-item-card{
    height: 100%;
  }
 
`


export const GameItem = ({id, name, price, image, rating, quantity}) => {
    const [show, setShow] = useState(false);

    const {game} = useContext(GameContext)
    const [gameState, setGame] = game

    const setSelectedGame = () => {
        //Create a new clone obj.
        setGame({id: id, name: name, price: price, image: image})
    }

    const hideModal = () => setShow(false)

    const handleDelete = () => {
        const url = `/games`
        axios.delete(`${url}/${id}`);
    }

    const loadImageSrc = () => {
        if (image === null){
            //use default img
            return require("../../assets/no-preview-available.png")
        }
        return `/images/${image}`
    }

    function descModal() {
        return (
            <Modal show={show} onHide={hideModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Name: {name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Price: Foooo {price}
                    <br/>
                    <GameRating/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }


    return (
        <StyledCol xs={12} sm={6} md={4} lg={3} xl={2}>
                {descModal()}
                <Card onClick={() => setShow(true)} className={"game-item-card"} >
                    <Card.Img variant="top" src={loadImageSrc()}/>
                    <Card.Body>
                        <GameRating rating={rating}/>
                        <Card.Text className={"game-title"}>{name}</Card.Text>
                        <Card.Text className={"game-price"}>{price}</Card.Text>
                    </Card.Body>
                    <Card.Footer>Numbers in stock: {quantity} </Card.Footer>
                </Card>
        </StyledCol>
    )
}

GameItem.propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
};

