import React, {useEffect, useState, useContext} from 'react';
import {GameItem} from './GameItem';
import Row from "react-bootstrap/Row";
import {GameContext} from "../../context/GameContext";

export const GameList = () => {
    const {games} = useContext( GameContext)
    //Retrieve games from the context
    const [gamesState] = games




    const renderGames = () => {
        //Fetch from database
        return gamesState.map((game, i) => {
            return <GameItem key={i} {...game}/>
        });
    }

    return (
        <section>
            <Row>
                {renderGames()}
                <span>Number of records:{games.length}</span>
            </Row>
        </section>
    )
}

