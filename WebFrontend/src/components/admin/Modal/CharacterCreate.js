import React, {useState} from "react";
import {createCharacter} from "../../../services/CharacterApi";
import styled from "styled-components";
import {Button} from "react-bootstrap";

const StyledRow = styled.tr`

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
            setName("")
            setRace("")
        }
    }

    return (
        <StyledRow>
            <th><input onChange={handleImgChange} type="file"/></th>
            <th><input type="text" value={name} onChange={(e) => setName(e.target.value)}/></th>
            <th><input type="text" value={race} onChange={(e) => setRace(e.target.value)}/></th>
            <th><Button onClick={() => create()} className={"create btn btn-success"}>Add</Button></th>
        </StyledRow>
    )
}