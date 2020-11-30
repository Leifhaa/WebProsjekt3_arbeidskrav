import React  from 'react';
import {useState} from 'react';
import axios from 'axios';
export const GameCreate = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [imageName, setImgName] = useState("");
    const [imgFile, setImgFile] = useState({});

    const onNameChange = ( e ) => {
        setName(e.target.value);
    }

    const onPriceChange = (e) => {
        setPrice(parseFloat(e.target.value))
    }

    const onImgNameChange = (e) => {
        setImgName(e.target.value)
    }





    const createGame = () => {
        const url = "/api/games";
        const newGame = {name: name, price: price, image: imageName};

        axios.post(url, newGame)
    }

    return (
        <selection>
            <h3>Create new game</h3>
            <label>Name</label>
            <input id="name" onChange={onNameChange} type="text" value={name}/>
            <label>Price</label>
            <input id="price" onChange={onPriceChange}  type="text" value={price}/>
            <label>Image</label>
            <input id="image" onChange={onImgNameChange}  type="text" value={imageName}/>
            <input onClick={createGame} type="button" value="Save new game"/>
            <br/>

        </selection>
    )
}