import React, {useEffect, useState} from "react";
import axios from "axios";
import styled from "styled-components";
import {Col, Row} from "react-bootstrap";
import {GameRater} from "./GameRater";
import Button from "react-bootstrap/Button";

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
    //Get the game id from URL.
    const [game, setGame] = useState()
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const url = `/api/games/${id}`;
        //Todo: Add AWait og promises og async.
        axios.get(url)
            .then(response => {
                setGame(response.data);
                setLoading(false)
            })
    }, [])

    useEffect(() => {
        const url = `/api/comments/game/${id}`;
        //Todo: Add AWait og promises og async.
        axios.get(url)
            .then(response => {
                setComments(response.data);
            })
    }, [])


    const loadImageSrc = () => {
        if (game.image === null) {
            //use default img
            return require("../../../assets/no-preview-available.png")
        }
        return `/images/${game.image}`
    }

    const renderComments = () => {
        if (comments.length === 0) {
            return <p>No comments yet. Be the first to comment!</p>
        }
        return (
            <ul>
                {comments.map((comment, idx) => {
                        return (
                            <li>{comment.text}
                            </li>)
                    }
                )}
            </ul>
        )
    }


    const renderProduct = () => {
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
                    <p className={"game-quantity"}>{game.quantity} left in stock</p>


                    <h3>Category</h3>
                    <p>{game.category}</p>
                    <br/>
                    <h3>Description:</h3>
                    <p>{game.description}</p>
                    <br/>
                    <h3>Comments from customers</h3>
                    {renderComments()}

                </Col>
            </Row>
        </article>
    }

    return (
        <Styled>
            {loading ?
                <h3>Loading...</h3>
                : renderProduct()
            }
        </Styled>
    )
}