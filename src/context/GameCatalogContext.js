//Used for keeping the state (advantage when multiple components relies on the state)

import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';
import {fetchGames} from "../services/GameApi";

export const GameCatalogContext = createContext();

export const GameCatalogProvider = (props) => {
    //All the item's
    const [games, setGames] = useState([])
    //If we're loading from API.
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        fetchGames(setGames,setLoading)
    }, [])

    //returns components which should have access to this context
    return (
        <GameCatalogContext.Provider value={{games: [games, setGames], loading: [loading]}}>
            {props.children}
        </GameCatalogContext.Provider>
    )
}