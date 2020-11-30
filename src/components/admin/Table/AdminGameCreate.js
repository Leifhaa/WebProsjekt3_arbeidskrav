import React, {useState} from "react";
import {Button} from "react-bootstrap";
import {AdminGameDelete} from "./AdminGameDelete";
import {GameModal} from "../Modal/GameModal";

export const AdminGameCreate = () => {
    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);

    return (
        <tr>
                <th><Button onClick={() => setShowModal(true)} className="btn btn-success">Add new game</Button></th>
                {showModal && <GameModal show={showModal} handleShow={handleShow} handleClose={handleClose}/>}
        </tr>
    )
}
