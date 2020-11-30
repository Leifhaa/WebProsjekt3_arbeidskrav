import {deleteCharacter} from "../../../services/CharacterApi";
import {Button} from "react-bootstrap";
import React, {useContext} from "react";
import {deleteGame} from "../../../services/GameApi";
import {GameCatalogContext} from "../../../context/GameCatalogContext";

export const AdminGameDelete = ({id}) => {
    const {games} = useContext(GameCatalogContext)
    //Retrieve games from the context
    const [gamesState, setGames] = games

    const delGame = async () => {
        if (await deleteGame(id)) {
            const newList = gamesState.filter(c => c.id !== id)
            setGames(newList)
        }
    }

    return (
        <Button onClick={() => delGame()} className={"btn btn-danger"}>Delete</Button>
    )
}