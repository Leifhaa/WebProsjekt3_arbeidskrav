import React, {useContext, useEffect, useState} from "react";
import {GameProductContext} from "../../../../context/GameProductContext";
import {fetchComments} from "../../../../services/CommentApi";
import {CommentItem} from "../comment/CommentItem";
import {CommentCreate} from "../comment/CommentCreate";

export const GameCommentsList = () => {
    const {game} = useContext(GameProductContext)
    const [gameState] = game
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetchComments(gameState.id, setComments)
    }, [])

    const addComment = (comment) => {
        setComments([...comments, comment])
    }

    const renderComments = () => {
        return (
            <React.Fragment>
                {comments.map((comment, idx) => {
                        return (
                            <CommentItem key={idx} {...comment}/>
                        )
                    }
                )}
            </React.Fragment>
        )
    }

    return (
        <StyledList>
            {comments.length < 1 ?
                <li>No comments yet. Be the first to comment!</li> :
                renderComments()}
            <CommentCreate addComment={addComment}/>
        </StyledList>
    )

}