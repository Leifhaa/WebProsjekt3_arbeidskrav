//Separated logic for speaking with API.

import axios from "axios";
import {postImage} from "./ImageApi";

export const fetchGame = async (id, setGame, setLoading) => {
    const url = `/api/games/${id}`;
    const response = await axios.get(url)
    setGame(response.data)
    setLoading(false)
}

export const fetchGames = async (setGames, setLoading, searchTxt) => {
    const url = "/api/games";
    const response = await axios.get(url, searchTxt)
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
        const response = await postImage("games", imgFile)
        if (response.status !== 200){
            return;
        }
        //Set image to the name generated by server.
        game.image = response.data;
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

export const deleteGame = async (gameId) => {
    const url = `/api/games`;
    const response = await axios.delete(`${url}/${gameId}`);
    return response.status === 204;
}

export const postGame = async (game, imgFile) => {
    //Upload the image of the game
    if (imgFile !== null){
        const response = await postImage(`games`, imgFile)
        if (response.status !== 200){
            return false;
        }
        //Set image to the name generated by server.
        game.image = response.data;
    }

    const url = `/api/games`;
    try {
        const response = await axios.post(url, game)
        if (response.status === 200) {
            //set the id which was assigned by db
            game.id = response.data.id
            return true;
        }
    } catch (error) {
        console.log("error", error)
    }
    return false;
}

