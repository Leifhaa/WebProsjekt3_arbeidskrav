import React, {useContext} from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap";
import {deleteCharacter} from "../../../services/CharacterApi";
import {GameCatalogContext} from "../../../context/GameCatalogContext";

const StyledTh = styled.th`
  
      color: red;
      cursor:pointer;
`
export const CharacterDelete = ({id, characters, setCharacters}) => {
    const delCharacter = async () => {
        if (await deleteCharacter(id)){
            const newList = characters.filter(c => c.id !== id)
            setCharacters(newList)
        }
    }

    return(
        <StyledTh>
            <Button onClick={() => delCharacter()}  className={"btn btn-danger"}>Delete</Button>
        </StyledTh>
    )
}