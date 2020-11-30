import React from "react";
import styled from "styled-components";

const StyledRow = styled.tr`
    img{
      max-height: 100px;
    }
    .delete{
      color: red;
      cursor:pointer;
    }
`

export const CharacterItem = ({image, name, race}) => {
    return(
        <StyledRow>
            <td>
            </td>
            <td>{name}</td>
            <td>{race}</td>
            <td className={"delete"}>Delete</td>
        </StyledRow>
    )
}