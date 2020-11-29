//Separated logic for speaking with API.

import axios from "axios";

export const fetchGame = async (id, setGame, setLoading) => {
    const url = `/api/games/${id}`;
    const response = await axios.get(url)
    setGame(response.data)
    setLoading(false)
}

export const postRating = async (id, rating, setRating, setHasRated) => {
    const url = `/api/games/${id}/rating`;
    try {
        const response = await axios.post(url, {Rating: rating})
        if (response.status === 200){
            setRating(rating)
            setHasRated(true)
        }
    } catch (error) {
        console.log("error", error)
    }
}


