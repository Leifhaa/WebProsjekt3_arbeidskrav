import React, {useEffect, useState, useContext} from 'react';
import {GameItem} from './GameItem';
import Row from "react-bootstrap/Row";
import {GameContext} from "../../../context/GameContext";
import styled from "styled-components";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";


const StyledRow = styled(Row)`
  display:flex;
  flex-wrap: wrap;
`


export const GameList = () => {
    const {games, loading} = useContext(GameContext)
    //Retrieve games from the context
    const [gamesState] = games
    const [loadingState] = loading

    const foo = true


    const renderGames = () => {
        //Fetch from database
        return gamesState.map((game, i) => {
            return <GameItem key={i} {...game}/>
        });
    }

    const renderLoading = () => {
        return (
            <div>
                <h3>Loading...</h3>
                <Spinner animation="border" role="status">
                    <span className="sr-only">Loading...</span>
                </Spinner>
            </div>
        )
    }

    return (
        <section>
            <StyledRow>
                {loadingState ? renderLoading() : renderGames()}
                <span>Number of records:{games.length}</span>
            </StyledRow>
        </section>
    )
}
