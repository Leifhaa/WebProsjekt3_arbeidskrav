import React from "react";
import { useParams, Route } from 'react-router-dom';

export const GameProduct = () => {
    //Get the game id from URL.
    const {id} = useParams();

    return (
        <div>
            <h3>Welcome to gameproudct page!</h3>
            <h3>{id}</h3>
        </div>
    )
}