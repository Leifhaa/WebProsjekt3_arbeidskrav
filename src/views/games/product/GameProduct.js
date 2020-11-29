import React from "react";

import {GameArticle} from "../../../components/game/product/GameArticle";
import {useParams} from "react-router-dom";


export const GameProduct = () => {
    //Get the game id from URL.
    const {id} = useParams();

    return(
        <section>
            <GameArticle id={id}/>
        </section>
    )
}