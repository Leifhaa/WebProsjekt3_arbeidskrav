import React from 'react';
import {GameList} from "../../../components/game/catalog/GameList";
import {GameCatalogProvider} from "../../../context/GameCatalogContext";
import styled from "styled-components";

const Styled = styled.section`
    h1{
      text-align: center;
    }
    padding:15px;
`

export const GameCatalog = () => {
    return(
        <Styled>
            <h1>Current games:</h1>
            <GameCatalogProvider>
                <GameList/>
            </GameCatalogProvider>
        </Styled>
    )
}