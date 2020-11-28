import React, {useEffect, useState} from 'react';
import {GameList} from "../components/game/GameList";
import {GameProvider} from "../context/GameContext";

export const Games = (props) => {
    //Todo: Create context of monsters
    //Todo: seperate API logic to /services/


    return(
        <section>
            <h3>Current games:</h3>
            <GameProvider>
                <GameList/>
            </GameProvider>
        </section>
    )
}