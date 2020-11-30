import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "../views/Home";
import {GameCatalog} from "../views/games/catalog/GameCatalog";
import React from "react";
import {MainNavivation} from "../components/navigation/MainNavigation";
import {GameProduct} from "../views/games/product/GameProduct";

export const Routes = () => {

    return (
        <BrowserRouter>
            <MainNavivation/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/games/:id" component={GameProduct}>
                    <GameProduct/>
                </Route>
                <Route path="/games">
                    <GameCatalog/>
                </Route>
                <Route path="/admin">
                    <GameCatalog/>
                </Route>

            </Switch>
        </BrowserRouter>
    )
}