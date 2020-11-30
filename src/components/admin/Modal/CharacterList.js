import React, {useContext, useEffect, useState} from "react";
import {fetchCharacters} from "../../../services/CharacterApi";
import {CharacterItem} from "./CharacterItem";
import styled from "styled-components";
import {Modal} from "react-bootstrap";
import {CharacterCreate} from "./CharacterCreate";

const StyledTable = styled.table`  
    border-collapse: separate;
    border-spacing: 50px 0;
      
    td{
      padding: 10px 0;
    }
`

export const CharacterList = ({gameId, editMode, characters, setCharacters}) => {
    useEffect(() => {
        fetchCharacters(gameId, setCharacters)
    }, [])



    const renderTable = () => {
        return (
            <React.Fragment>
                {editMode ?
                    <StyledTable>
                        <tbody>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Race</th>
                        </tr>
                        {characters.map((character, index) => {
                            return (
                                <CharacterItem key={index} name={character.name} image={character.image}
                                               race={character.race}/>
                            )
                        })
                        }
                        <tr>
                            <th>Create new character</th>
                        </tr>
                        <CharacterCreate gameId={gameId} characters={characters} setCharacters={setCharacters}/>
                        </tbody>
                    </StyledTable>
                    :
                    <p>Character list can only be edited on existing games!</p>
                }
            </React.Fragment>)
    }

    return (
        <React.Fragment>
            <h6>Character list:</h6>
            {editMode ?
                renderTable()
                : <p>Editing characters is only allowed when editing a game, not when creating a game.</p>
            }
        </React.Fragment>
    )
}