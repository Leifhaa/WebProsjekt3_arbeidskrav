import React from "react";
import {Button} from "react-bootstrap";
import {deleteCharacter} from "../../../services/CharacterApi";


export const CharacterDelete = ({id, characters, setCharacters}) => {
    const delCharacter = async () => {
        if (await deleteCharacter(id)){
            const newList = characters.filter(c => c.id !== id)
            setCharacters(newList)
        }
    }

    return(
        <th>
            <Button onClick={() => delCharacter()}  className={"btn btn-danger"}>Delete</Button>
        </th>
    )
}