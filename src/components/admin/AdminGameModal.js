import React, {useContext, useState} from "react";
import {Modal} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {putGame} from "../../services/GameApi";
import {GameCatalogContext} from "../../context/GameCatalogContext";

export const AdminGameModal = ({show, handleClose, id, name, description, price, category, quantity, ratingAvg, ratingCounter, ratingSum, image}) => {
    const {games} = useContext(GameCatalogContext)
    const [gamesState, setGames] = games


    const [newName, setNewName] = useState(name)
    const [newDescription, setNewDescription] = useState(description)
    const [newPrice, setNewPrice] = useState(price)
    const [newCategory, setNewCategory] = useState(category)
    const [newQuantity, setNewQuantity] = useState(quantity)

    const onSave = () => {
        let newGame = {
            name: newName,
            description: newDescription,
            price: parseFloat(newPrice),
            image: image,
            category: newCategory,
            ratingAvg: ratingAvg,
            ratingCounter: ratingCounter,
            ratingSum: ratingSum,
            quantity: parseInt(newQuantity)
        }
        //Changes are done locally so we don't have to fetch API after changes.
        if (id === null) {
            ///Create a new game

        } else {
            update(newGame)
        }
        handleClose()
    }

    const update = (newGame) => {
        //Editing existing game
        newGame.id = id;
        putGame(newGame.id, newGame)
        let updatedList = gamesState.filter(game => game.id !== newGame.id)
        updatedList.push(newGame)
        setGames(updatedList)
    }

    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{id === null ? "Create game" : "Edit game"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h6>Name:</h6>
                    <input value={newName} onChange={(e) => setNewName(e.target.value)}/>
                    <h6>Description:</h6>
                    <textarea rows={5} cols={40} value={newDescription}
                              onChange={(e) => setNewDescription(e.target.value)}/>
                    <h6>Price:</h6>
                    <input type={"text"} value={newPrice} onChange={(e) => setNewPrice(e.target.value)}/>
                    <h6>Category:</h6>
                    <input type={"text"} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                    <h6>Quantity:</h6>
                    <input type={"text"} value={newQuantity} onChange={(e) => setNewQuantity(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={onSave}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </React.Fragment>
    );
}

AdminGameModal.defaultProps = {
    ratingAvg: 0,
    ratingCounter: 0,
    ratingSum: 0,
    image: null
}