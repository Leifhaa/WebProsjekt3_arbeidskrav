//Used for keeping the state (advantage when multiple components relies on the state)

import React, {useState, createContext, useEffect} from 'react';
import axios from 'axios';

export const GameContext = createContext();

export const GameProvider = (props) => {
    //The 'selected' item
    const [game, setGame] = useState()
    //All the item's
    const [games, setGames] = useState([])
    //If we're loading from API.
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        const url = "/games";
        //Todo: Add AWait og promises og async.
        axios.get(url)
            .then(response => {
                setGames(response.data);
                setLoading(false)
            })
    }, [])

    //returns components which should have access to this context
    return (
        <GameContext.Provider value={{games: [games, setGames], game: [game, setGame], loading: [loading]}}>
            {props.children}
        </GameContext.Provider>
    )
}