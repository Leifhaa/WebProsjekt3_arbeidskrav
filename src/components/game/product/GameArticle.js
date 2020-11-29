import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {Col, Row} from "react-bootstrap";
import {GameRater} from "./GameRater";
import Button from "react-bootstrap/Button";
import {GameCommentsList} from "./comment/CommentList";
import {fetchGame} from "../../../services/GameApi";
import {GameCatalogContext} from "../../../context/GameCatalogContext";
import {GameProductContext} from "../../../context/GameProductContext";

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

export const GameArticle = ({id}) => {
    const {game, loading} = useContext(GameProductContext)
    //Retrieve games from the context
    const [gameState] = game
    const [loadingState] = loading




    const loadImageSrc = () => {
        if (game.image === null) {
            //use default img
            return require("../../../assets/no-preview-available.png")
        }
        return `/images/${game.image}`
    }


    const renderArticle = () => {
        return <article>
            <Row>
                <Col xs={12} lg={4}>
                    <img src={loadImageSrc()} alt={"Cover of the game"} className={"game-cover"}/>
                </Col>
                <Col xs={12} md={6}>
                    <h1>{game.name}</h1>
                    <h3>Give a rating</h3>
                    <GameRater id={id} ratingCounter={game.ratingCounter}/>
                    <h3>Purchase</h3>
                    <Button variant={"success"}>Purchase!</Button>
                    <p className={"game-quantity"}>{gameState.quantity} left in stock</p>
                    <h3>Category</h3>
                    <p>{game.category}</p>
                    <br/>
                    <h3>Description:</h3>
                    <p>{game.description}</p>
                    <br/>
                    <h3>Comments from customers</h3>
                    <GameCommentsList id={id}/>
                </Col>
            </Row>
        </article>
    }

    return (
        <Styled>
            {loading ?
                <h3>Loading...</h3>
                : renderArticle()
            }
        </Styled>
    )
}