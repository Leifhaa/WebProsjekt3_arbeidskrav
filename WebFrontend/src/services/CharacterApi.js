import axios from "axios";
import {postImage} from "./ImageApi";

export const fetchCharacters = async (id, setCharacters) => {
    const url = `/api/characters/games/${id}`;
    const response = await axios.get(url)
    setCharacters(response.data)
}

export const createCharacter = async (id, character, imgFile) => {
    //Upload the image of the game
    if (imgFile !== null){
        const response = await postImage(`characters/games/${id}`, imgFile)
        if (response.status !== 200){
            return false;
        }
        //Set image to the name generated by server.
        character.image = response.data;
    }

    const url = `/api/characters`;
    try {
        const response = await axios.post(url, character)
        if (response.status === 200) {
            //set the id of the created character
            character.id = response.data.id;
            return true;
        }
    } catch (error) {
        console.log("error", error)
    }
    return false;
}

export const deleteCharacter = async (characterId) => {
    const url = `/api/characters`;
    const response = await axios.delete(`${url}/${characterId}`);
    return response.status === 204;
}


