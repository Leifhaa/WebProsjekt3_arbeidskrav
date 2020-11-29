import React from "react";

import {GameArticle} from "../../../components/game/product/GameArticle";
import {useParams} from "react-router-dom";
import {GameCatalogProvider} from "../../../context/GameCatalogContext";
import {GameProductProvider} from "../../../context/GameProductContext";


export const GameProduct = () => {


    return(
        <section>
            <GameProductProvider>
                <GameArticle/>
            </GameProductProvider>
        </section>
    )
}