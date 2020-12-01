import React, {useContext, useState} from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import {createComment} from "../../../../services/CommentApi";
import {GameProductContext} from "../../../../context/GameProductContext";

const StyledArticle = styled.article`
    input,label, button{display:block};
`

export const CommentCreate = ({addComment, id}) => {
    const {game} = useContext(GameProductContext)
    const [gameState] = game
    const [author, setAuthor] = useState("");
    const [text, setText] = useState("");

    const postComment = () => {
        const comment = {author: author, text: text, gameId: gameState.id}
        const ok = createComment(gameState.id,comment)
        if (ok){
            //Successful, so add comment 'locally'.
            //No need to fetch all comments whenver adding a new one if the HTTP request was successful
            addComment(comment)
        }
        setText("")
        setAuthor("")
    }

    const onAuthorChange = (e) => {
        setAuthor(e.target.value);
    }

    const onTextChange = (e) => {
        setText(e.target.value);
    }

    return (
        <StyledArticle>
            <h5>Write a comment:</h5>
            <label>Author:</label>
            <input value={author} onChange={onAuthorChange} type="text" placeholder={"Write your name..."}/>
            <label>Comment:</label>
            <textarea value={text} onChange={onTextChange} cols={40} rows={5} placeholder={"Write your comment..."}/>
            <Button onClick={postComment}>Post comment</Button>
        </StyledArticle>
    )
}