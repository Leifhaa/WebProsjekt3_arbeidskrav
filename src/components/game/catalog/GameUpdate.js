import React, {useContext, useEffect} from 'react';
import axios from 'axios'
import {GameCatalogContext} from "../../../context/GameCatalogContext";

export const GameUpdate = () => {
    const {game} = useContext(GameCatalogContext)
    const [gameState, setGame] = game

    const updateGame = () => {
        const url = "/api/games";
        //Todo: Add AWait og promises og async.
        axios.put(`${url}/${gameState.id}`, gameState)
    }

    return (
        <section>
            <h3>Edit game</h3>
            <label>Name</label>
            <input onChange={(e) => setGame({...gameState, name: e.target.value})} type="text" value={gameState.name}/>
            <input onClick={updateGame} type="button" value="Edit"/>
        </section>
    )
}