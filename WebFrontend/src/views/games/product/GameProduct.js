import React from "react";

import {GameArticle} from "../../../components/game/product/GameArticle";
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