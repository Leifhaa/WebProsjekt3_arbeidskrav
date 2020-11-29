import styled from "styled-components";
import React, {useState} from "react";
import axios from "axios";

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
export const GameRater = ({id}) => {
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)
    const [hasRated, setRated] = useState(false)

    const uploadRating = async (rating) => {
        const url = `/api/games/${id}/rating`;
        try {
            const response = await axios.post(url, {Rating: rating})
            if (response.status === 200){
                setRating(rating)
                setRated(true)
            }
        } catch (error) {
            console.log("error", error)
        }
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