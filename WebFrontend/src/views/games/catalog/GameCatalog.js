import React from 'react';
import {GameList} from "../../../components/game/catalog/GameList";
import {GameCatalogProvider} from "../../../context/GameCatalogContext";
import styled from "styled-components";

const Styled = styled.section`

    padding:15px;
`

export const GameCatalog = (props) => {
    return(
        <Styled>
            <h1 style={{textAlign: "center"}}>Current games:</h1>
            <GameCatalogProvider>
                <GameList/>
            </GameCatalogProvider>
        </Styled>
    )
}