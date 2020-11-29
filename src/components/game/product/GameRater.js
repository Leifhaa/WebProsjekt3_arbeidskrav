import styled from "styled-components";
import React, {useContext, useState} from "react";
import axios from "axios";
import {GameProductContext} from "../../../context/GameProductContext";
import {postRating} from "../../../services/GameApi";

const StyledStars = styled.div`
    span{
      font-size:35px;
    }

    .fa-star{
      cursor: pointer;
    }

    input[type="radio"]{
      display:none;
    }
    .checked{
        color:orange;
    }
    .unchecked{
        color:grey;
    }
`
export const GameRater = () => {
    //Retrieve the game
    const {game} = useContext(GameProductContext)
    const [gameState] = game;

    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [hasRated, setHasRated] = useState(false)

    const uploadRating = async (rating) => {
        await postRating(gameState.id, rating, setRating, setHasRated)
    }


    return (
        <StyledStars>
            {[...Array(5)].map((x, i) => {
                    const ratingVal = i + 1
                    return (
                        <label>
                            <input
                                type="radio"
                                name="rating"
                                value={ratingVal}
                                onClick={() => uploadRating(ratingVal)}

                            />
                            <span
                                className={"fa fa-star"}
                                style={{color: ratingVal <= (hover || rating) ? "orange" : "grey"}}
                                onMouseEnter={() => setHover(ratingVal)}
                                onMouseOut={() => setHover(null)}
                            />
                        </label>
                    )
                }
            )}
            {hasRated ? <p>Thank you for reviewing this game!</p>: <p/> }
        </StyledStars>
    )
}