import React, {useEffect, useState} from 'react';
import {GameList} from "../../../components/game/catalog/GameList";
import {GameCatalogProvider} from "../../../context/GameCatalogContext";
import styled from "styled-components";

const Styled = styled.section`

    padding:15px;
`

export const GameCatalog = (props) => {
    return(
        <Styled>
            <h3>Current games:</h3>
            <GameCatalogProvider>
                <GameList/>
            </GameCatalogProvider>
        </Styled>
    )
}