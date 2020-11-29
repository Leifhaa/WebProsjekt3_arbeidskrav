import React, {useEffect, useState} from 'react';
import {GameList} from "../../../components/game/catalog/GameList";
import {GameCatalogProvider} from "../../../context/GameCatalogContext";

export const GameCatalog = (props) => {
    return(
        <section>
            <h3>Current games:</h3>
            <GameCatalogProvider>
                <GameList/>
            </GameCatalogProvider>
        </section>
    )
}