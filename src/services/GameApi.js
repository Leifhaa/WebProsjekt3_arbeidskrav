//Separated logic for speaking with API.

import axios from "axios";
import {useEffect} from "react";
import {postImage} from "./ImageApi";

export const fetchGame = async (id, setGame, setLoading) => {
    const url = `/api/games/${id}`;
    const response = await axios.get(url)
    setGame(response.data)
    setLoading(false)
}

export const fetchGames = async (setGames, setLoading) => {
    const url = "/api/games";
    const response = await axios.get(url)
    setGames(response.data);
    setLoading(false)
}

export const postRating = async (id, rating, setRating, setHasRated) => {
    const url = `/api/games/${id}/rating`;
    try {
        const response = await axios.post(url, {Rating: rating})
        if (response.status === 200) {
            setRating(rating)
            setHasRated(true)
        }
    } catch (error) {
        console.log("error", error)
    }
}


export const purchaseGame = async (id) => {
    const url = `/api/games/${id}/purchase`;
    try {
        const response = await axios.post(url)
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.log("error", error)
    }
    return false;
}

export const putGame = async (id, game, imgFile) => {
    //Upload the image of the game
    if (imgFile !== null){
        await postImage("games", imgFile)
    }

    const url = `/api/games/${id}`;
    try {
        const response = await axios.put(url, game)
        if (response.status === 200) {
            return true;
        }
    } catch (error) {
        console.log("error", error)
    }
    return false;
}


