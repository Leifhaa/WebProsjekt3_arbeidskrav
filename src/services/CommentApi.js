import axios from "axios";

export const fetchComments = async (id, setComments) => {
    const url = `/api/comments/game/${id}`;
    const response = await axios.get(url)
    setComments(response.data)
}


export const createComment = async (id, comment) => {
    const url = `/api/comments/game/${id}`;
    const response = await axios.post(url, comment)
    return response.status === 200;
}

