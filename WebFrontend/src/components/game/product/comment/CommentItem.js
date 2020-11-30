import React from "react";


export const CommentItem = ({author, text}) => {
    return(
        <li>
            <h5>Author: {author}</h5>
            <p>Comment: {text}</p>
            <hr/>
        </li>
    )
}