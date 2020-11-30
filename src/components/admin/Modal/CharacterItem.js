import React from "react";
import styled from "styled-components";
import {CharacterDelete} from "./CharacterDelete";



export const CharacterItem = ({id,image, name, race}) => {
    return(
        <tr>
            <td>{image}</td>
            <td>{name}</td>
            <td>{race}</td>
            <CharacterDelete id={id}/>
        </tr>
    )
}