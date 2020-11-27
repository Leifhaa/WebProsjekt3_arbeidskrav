import React  from 'react';
import {useState} from 'react';
import axios from 'axios';
export const GameCreate = () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    const handleChange = (e) => {
        switch (e.target.id){
            case "name":
                setName( e.target.value);
                break;
            case "price":
                setPrice(parseFloat(e.target.value))
                break;
            case "image":
                setImage(e.target.value)
                break;
            default:
        }
    }
    const createGame = () => {
        const url = "https://localhost:5001/games";
        const newGame = {name: name, price: price, image: image};

        axios.post(url, newGame)
    }

    return (
        <selection>
            <h3>Create new game</h3>
            <label>Name</label>
            <input id="name" onChange={handleChange} type="text" value={name}/>
            <label>Price</label>
            <input id="price" onChange={handleChange}  type="text" value={price}/>
            <label>Image</label>
            <input id="image" onChange={handleChange}  type="text" value={image}/>
            <input onClick={createGame} type="button" value="Save new game"/>
        </selection>
    )
}