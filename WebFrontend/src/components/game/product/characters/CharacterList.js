import React, {useContext, useEffect, useState} from "react";
import {GameProductContext} from "../../../../context/GameProductContext";
import {fetchCharacters} from "../../../../services/CharacterApi";
import styled from "styled-components";
import {CharacterItem} from "./CharacterItem";

const StyledTable = styled.table`  
    border-collapse: separate;
    border-spacing: 50px 0;
      
    td{
      padding: 10px 0;
    }
`

export const CharactersList = () => {
    const {game} = useContext(GameProductContext)
    const [gameState] = game
    const [characters, setCharacters] = useState([])

    useEffect(() => {
        fetchCharacters(gameState.id, setCharacters)
    }, [])

    const renderTable = () => {
        return (
            <StyledTable>
                <tbody>
                <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Race</th>
                </tr>
                {characters.map((character, index) => {
                    return (
                        <CharacterItem key={index} gameId={gameState.id} name={character.name} image={character.image} race={character.race}/>
                    )
                })
                }
                </tbody>
            </StyledTable>)
    }

    return (
        <React.Fragment>
            {characters.length < 1 ?
                <li>List of characters is empty!</li> :
                renderTable()}
        </React.Fragment>
    )

}