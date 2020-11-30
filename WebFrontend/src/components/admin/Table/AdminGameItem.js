import React, {useState} from "react";
import styled from "styled-components";
import {GameModal} from "../Modal/GameModal";
import {Button} from "react-bootstrap";
import {AdminGameDelete} from "./AdminGameDelete";

const StyledRow = styled.tr`

`

export const AdminGameItem = ({game}) => {


    const [showModal, setShowModal] = useState(false)
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);



    return (
        <StyledRow>
            <td>{game.name}</td>
            <td><Button onClick={() => setShowModal(true)} className="btn btn-warning">Edit</Button></td>
            <td><AdminGameDelete id={game.id}/></td>
            {showModal && <GameModal show={showModal} handleShow={handleShow} handleClose={handleClose} {...game}/>}
        </StyledRow>
    )
}