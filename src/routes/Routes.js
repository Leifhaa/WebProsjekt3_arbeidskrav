import {BrowserRouter, Route, Switch} from "react-router-dom";
import {Home} from "../views/Home";
import {Games} from "../views/Games";
import React from "react";
import {MainNavivation} from "../components/navigation/MainNavigation";

export const Routes = () => {

    return (
        <BrowserRouter>
            <MainNavivation/>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/games">
                    <Games/>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}