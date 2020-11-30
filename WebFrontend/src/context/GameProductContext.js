import React, {useState, createContext, useEffect} from 'react';
import {useParams} from "react-router-dom";
import {fetchGame} from "../services/GameApi";

export const GameProductContext = createContext();

export const GameProductProvider = (props) => {
    //Get the game id from URL.
    const {id} = useParams();
    //The game
    const [game, setGame] = useState(null)
    //If we're loading from API.
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchGame(id, setGame, setLoading);
    }, [id])

    //returns components which should have access to this context
    return (
        <GameProductContext.Provider value={{game: [game, setGame], loading: [loading], id: [id]}}>
            {props.children}
        </GameProductContext.Provider>
    )
}