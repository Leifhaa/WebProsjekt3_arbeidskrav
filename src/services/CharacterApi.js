import axios from "axios";

export const fetchCharacters = async (id, setCharacters) => {
    const url = `/api/characters/game/${id}`;
    const response = await axios.get(url)
    setCharacters(response.data)
}