import styled from "styled-components";
import React, {useState} from "react";

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
    const [rating, setRating] = useState(null)
    const [hover, setHover] = useState(null)



    return(
        <StyledStars>
            {[...Array(5)].map((x, i) =>{
                const ratingVal = i+1
                return (
                    <label>
                        <input
                            type="radio"
                            name="rating"
                            value={ratingVal}
                            onClick={() => setRating(ratingVal)}

                        />
                        <span
                            className={"fa fa-star"}
                            style={{color:ratingVal <= (hover || rating) ? "orange" : "grey"}}
                            onMouseEnter={() => setHover(ratingVal)}
                            onMouseOut={() => setHover(null)}
                            />
                    </label>
                    )
                }
            )}
        </StyledStars>
    )
}