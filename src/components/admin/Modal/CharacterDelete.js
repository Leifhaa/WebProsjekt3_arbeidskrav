import React from "react";
import styled from "styled-components";
import {Button} from "react-bootstrap";

const StyledTh = styled.th`
  
      color: red;
      cursor:pointer;
`
export const CharacterDelete = ({id}) => {
    return(
        <StyledTh>
            <Button className={"btn btn-danger"}>Delete</Button>
        </StyledTh>
    )
}