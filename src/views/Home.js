import React from 'react';

export const Home = () => {
    return (
        <div>
            <h3 className={"main-title"} >Welcome to Gaming2021, giving you information about the new playstation games!</h3>
            <img className={"main-logo"} src={require("../assets/playstation.png")}/>
        </div>
    )
}