import React, {useContext, useEffect, useState} from "react";
import styled from "styled-components";
import {CommentItem} from "./CommentItem";
import {CommentCreate} from "./CommentCreate";
import {fetchComments} from "../../../../services/CommentApi";
import {GameProductContext} from "../../../../context/GameProductContext";


const StyledList = styled.ul`
    list-style-type: none;
`

export const GameCommentsList = () => {
    const {game} = useContext(GameProductContext)
    const [gameState] = game
    const [comments, setComments] = useState([])

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
                            <CommentItem {...comment}/>
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