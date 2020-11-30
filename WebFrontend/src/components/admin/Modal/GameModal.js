import React, {useContext, useState} from "react";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {postGame, putGame} from "../../../services/GameApi";
import {GameCatalogContext} from "../../../context/GameCatalogContext";
import {CharacterList} from "./CharacterList";

//Modal si used for both creating and editing a game
export const GameModal = ({show, handleClose, id, name, description, price, category, quantity, ratingAvg, ratingCounter, ratingSum}) => {
    const {games} = useContext(GameCatalogContext)
    const [gamesState, setGames] = games
    const [characters, setCharacters] = useState([])
    const [newName, setNewName] = useState(name)
    const [newDescription, setNewDescription] = useState(description)
    const [newPrice, setNewPrice] = useState(price)
    const [newCategory, setNewCategory] = useState(category)
    const [newQuantity, setNewQuantity] = useState(quantity)
    const [imgFile, setImgFile] = useState(null)

    //True if editing. False if creating
    const [editMode] = useState(id !== null && id !== undefined)



    const onSave = () => {
        //Create game object
        let newGame = {
            name: newName,
            description: newDescription,
            price: parseFloat(newPrice),
            image: null,
            category: newCategory,
            ratingAvg: ratingAvg,
            ratingCounter: ratingCounter,
            ratingSum: ratingSum,
            quantity: parseInt(newQuantity),
        }
        //Changes are done locally so we don't have to fetch API after changes.
        if (editMode) {
            update(newGame)
        } else {
            //Creating new game
            create(newGame)
        }
        handleClose()
    }
    const create = async (newGame) => {
        //Create new game
        await postGame(newGame, imgFile)
        setGames([...gamesState, newGame])
    }

    const update = (newGame) => {
        //Update existing game
        newGame.id = id;
        putGame(newGame.id, newGame, imgFile)
        let updatedList = gamesState.filter(game => game.id !== newGame.id)
        updatedList.push(newGame)
        setGames(updatedList)
    }

    const handleImgChange = (e) => {
        setImgFile(e.target.files[0])
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} size={"xl"} >
                <Modal.Header closeButton>
                    <Modal.Title>{ editMode ? "Edit game" : "Create game"}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{'maxHeight': 'calc(100vh - 210px)', 'overflowY': 'auto'}}>
                    <h6>Name:</h6>
                    <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <h6>Description:</h6>
                    <textarea rows={5} cols={100} value={newDescription}
                              onChange={(e) => setNewDescription(e.target.value)}/>
                    <h6>Price:</h6>
                    <input type={"text"} value={newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
                    <h6>Category:</h6>
                    <input type={"text"} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                    <h6>Quantity:</h6>
                    <input type={"text"} value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)}/>
                    <h6>Image:</h6>
                    <input onChange={handleImgChange} type="file"/>
                    <CharacterList gameId={id} editMode={editMode} characters={characters} setCharacters={setCharacters}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        Save
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

GameModal.defaultProps = {
    name:"",
    description:"",
    price: 0,
    category: "",
    quantity: 0,
    ratingAvg: 0,
    ratingCounter: 0,
    ratingSum: 0,
    image: null
}