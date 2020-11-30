import React, {useState} from "react";
import {createCharacter} from "../../../services/CharacterApi";
import styled from "styled-components";

const StyledRow = styled.tr`
    .create{
      color: darkgreen;
      cursor:pointer;
    }
`

export const CharacterCreate = ({gameId, characters,setCharacters}) => {
    const [imgFile, setImgFile] = useState()
    const [name, setName] = useState()
    const [race, setRace] = useState()

    const handleImgChange = (e) => {
        setImgFile(e.target.files[0])
    }

    const create = async () => {
        let character = {
            id: null,
            image:null,
            name:name,
            race: race,
            gameId: gameId
        }
        //Add created character.
        if (await createCharacter(gameId,character, imgFile)){
            setCharacters([...characters, character])
        }
    }

    return (
        <StyledRow>
            <th><input onChange={handleImgChange} type="file"/></th>
            <th><input type="text" onChange={(e) => setName(e.target.value)}/></th>
            <th><input type="text" onChange={(e) => setRace(e.target.value)}/></th>
            <th><span onClick={() => create()} className={"create"}>Add</span></th>
        </StyledRow>
    )
}