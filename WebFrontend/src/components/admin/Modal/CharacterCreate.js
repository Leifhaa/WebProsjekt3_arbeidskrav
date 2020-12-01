import React, {useState} from "react";
import {createCharacter} from "../../../services/CharacterApi";
import styled from "styled-components";
import {Button} from "react-bootstrap";

const StyledRow = styled.tr`

`

export const CharacterCreate = ({gameId, characters,setCharacters}) => {
    const [imgFile, setImgFile] = useState(null)
    const [name, setName] = useState("")
    const [race, setRace] = useState("")

    const onNameChange = (e) => {
        setName(e.target.value);
    }

    const onRaceChange = (e) => {
        setRace(e.target.value);
    }

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
            setImgFile(null)
        }
    }



    return (
        <StyledRow>
            <td><input onChange={handleImgChange} type="file"/></td>
            <td><input onChange={onNameChange} type="text" value={name}/></td>
            <td><input onChange={onRaceChange} type={"text"} value={race}/></td>
            <td><Button onClick={() => create()} className={"create btn btn-success"}>Add</Button></td>
        </StyledRow>
    )
}