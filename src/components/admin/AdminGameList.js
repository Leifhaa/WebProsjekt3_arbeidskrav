import React, {useContext} from "react";
import {GameCatalogContext} from "../../context/GameCatalogContext";
import {CharacterItem} from "../game/product/characters/CharacterItem";
import {AdminGameItem} from "./AdminGameItem";

export const AdminGameList = () => {
    const {games, loading} = useContext(GameCatalogContext)
    //Retrieve games from the context
    const [gamesState] = games

    return (
        <table border={1}>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Click to edit</th>
                <th>Click to delete</th>
            </tr>
            {gamesState.map((character, index) => {
                return (
                    <AdminGameItem key={index} {...character}/>
                )
            })
            }
            </tbody>
        </table>
    )
}