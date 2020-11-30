import React from "react";
import styled from "styled-components";

const StyledRow = styled.tr`
    img{
      max-height: 100px;
    }
`

export const CharacterItem = ({gameId,image, name, race}) => {
    const loadImg = () => {
        if (image === null || image === undefined) {
            //use default img
            return require("../../../../assets/no-preview-available.png")
        }
        return `/images/characters/games/${gameId}/${image}`
    }

    return(
        <StyledRow>
            <td>
                <img src={loadImg()} alt={"The character"} className={"character-img"}/>
            </td>
            <td>{name}</td>
            <td>{race}</td>
        </StyledRow>
    )
}