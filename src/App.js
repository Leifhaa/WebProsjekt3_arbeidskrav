import React, {useEffect, useState} from 'react';
import './App.css';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes} from "./routes/Routes";

function App() {

    return (
        <div className="App">
            <Routes/>
        </div>
    );
}


export default App;
