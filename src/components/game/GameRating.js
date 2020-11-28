import styled from "styled-components";
import {Card} from "react-bootstrap";
import React from "react";

const StyledStars = styled.div`
    .checked{
        color:orange;
    }
    .unchecked{
        color:grey;
    }
`
export const GameRating = ({rating}) => {
    const roundedRating = Math.round(rating);
    return(
        <StyledStars>
            {[...Array(5)].map((x, i) =>
                <span key={i} className = { i < roundedRating ? "fa fa-star checked" : "fa fa-star unchecked"}/>
            )}
        </StyledStars>
    )
}