import React, {useState, useContext, useCallback} from 'react';
import {Card, CardImg} from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {GameContext} from "../../../context/GameContext";
import styled, { css } from 'styled-components'
import {GameRating} from "./GameRating";

const StyledCol = styled(Col)`
  text-align: center;

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
  
  .game-item-img{
    width: 100%;
    height: 330px;
  }
 
`


export const GameItem = ({id, name, price, image, rating: ratingAvg, quantity}) => {
    const history = useHistory();

    const {game} = useContext(GameContext)
    const [gameState, setGame] = game

    const setSelectedGame = () => {
        //Create a new clone obj.
        setGame({id: id, name: name, price: price, image: image})
    }

    const handleDelete = () => {
        const url = `/api/games`
        axios.delete(`${url}/${id}`);
    }

    const loadImageSrc = () => {
        if (image === null){
            //use default img
            return require("../../../assets/no-preview-available.png")
        }
        return `/images/${image}`
    }

    const handleOnClick = useCallback(() => history.push(`/games/${id}`), [history]);

    return (
        <StyledCol xs={12} sm={6} md={4} lg={3} xl={2}>
                <Card onClick={handleOnClick} className={"game-item-card"} >
                    <Card.Img className={"game-item-img"} variant="top" src={loadImageSrc()}/>
                    <Card.Body>
                        <GameRating rating={ratingAvg}/>
                        <Card.Text className={"game-title"}>{name}</Card.Text>
                    </Card.Body>
                    <Card.Text className={"game-price"}>{price}</Card.Text>
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

