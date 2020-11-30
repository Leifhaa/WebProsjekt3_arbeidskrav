import React, {useContext} from "react";
import styled from "styled-components";
import {Col, Row} from "react-bootstrap";
import {GameRater} from "./GameRater";
import Button from "react-bootstrap/Button";
import {GameCommentsList} from "./comment/CommentList";
import {purchaseGame} from "../../../services/GameApi";
import {GameProductContext} from "../../../context/GameProductContext";
import {CharactersList} from "./characters/CharacterList";

const Styled = styled.div`
    .game-cover{
      height:400px;
      display: block;
      margin-left: auto;
      margin-right: auto 
    }
    
    .game-quantity{
      font-style:italic;
    }
`

export const GameArticle = () => {
    const {game, loading} = useContext(GameProductContext)
    //Retrieve games from the context
    const [gameState, setGame] = game
    const [loadingState] = loading



    const purchase = () => {
        if (purchaseGame(gameState.id)){
            setGame({...gameState, quantity: gameState.quantity - 1})
        }
    }


    const loadImageSrc = () => {
        if (gameState.image === null) {
            //use default img
            return require("../../../assets/no-preview-available.png")
        }
        return `/images/games/${gameState.image}`
    }


    const renderArticle = () => {
        return <article>
            <Row>
                <Col xs={12} lg={4}>
                    <img src={loadImageSrc()} alt={"Cover of the game"} className={"game-cover"}/>
                </Col>
                <Col xs={12} md={6}>
                    <h1>{gameState.name}</h1>
                    <h3>Give a rating</h3>
                    <GameRater id={gameState.id} ratingCounter={gameState.ratingCounter}/>
                    <h3>Purchase</h3>
                    <Button variant={"success"} onClick={purchase} disabled={gameState.quantity < 1}>Purchase!</Button>
                    <p className={"game-quantity"}>{gameState.quantity} left in stock</p>
                    <h3>Category</h3>
                    <p>{gameState.category}</p>
                    <br/>
                    <h3>Description:</h3>
                    <p>{gameState.description}</p>
                    <br/>
                    <h3>Game characters:</h3>
                    <CharactersList/>
                    <br/>
                    <h3>Comments from customers</h3>
                    <GameCommentsList/>
                </Col>
            </Row>
        </article>
    }

    return (
        <Styled>
            {loadingState ?
                <h3>Loading...</h3>
                : renderArticle()
            }
        </Styled>
    )
}