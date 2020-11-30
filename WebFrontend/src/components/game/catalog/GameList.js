import React, {useState, useContext} from 'react';
import {GameItem} from './GameItem';
import Row from "react-bootstrap/Row";
import styled from "styled-components";
import Spinner from "react-bootstrap/Spinner";
import {GameCatalogContext} from "../../../context/GameCatalogContext";
import {GameFilter} from "./GameFilter";

const StyledRow = styled(Row)`
  display:flex;
  flex-wrap: wrap;
`

export const GameList = () => {
    //Retrieve games from the context
    const {games, loading} = useContext(GameCatalogContext)
    const [gamesState] = games
    const [gamesFiltered, setFiltered] = useState(gamesState)
    //How the games are ordered. 0 = name, 1 = price
    const [loadingState] = loading

    const renderGames = () => {
        //Fetch from database
        return gamesFiltered.map((game, i) => {
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
            <GameFilter setFiltered={setFiltered}/>
            <StyledRow>
                {loadingState ? renderLoading() : renderGames()}
            </StyledRow>
        </section>
    )
}

