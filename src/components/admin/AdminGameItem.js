import React, {useState} from "react";
import styled from "styled-components";
import {AdminGameModal} from "./AdminGameModal";

const StyledRow = styled.tr`
    .delete{
      color:red;
      
    }
   
    .delete:hover{
      cursor:pointer;
    }
    
    .edit{
      color:darkorange;
    }
    
    .edit:hover{
       cursor:pointer;
    }
`

export const AdminGameItem = ({id, name}) => {
    const [showModal, setShowModal] = useState(false)

    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);



    return (
        <StyledRow>
            <td>{name}</td>
            <td className={"delete"}>Delete</td>
            <td className={"edit"} onClick={() => setShowModal(true)}>Edit</td>
            {showModal && <AdminGameModal show = {showModal} handleShow={handleShow} handleClose = {handleClose}/>}
        </StyledRow>
    )
}