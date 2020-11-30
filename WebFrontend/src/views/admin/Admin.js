import styled from "styled-components";
import {GameCatalogProvider} from "../../context/GameCatalogContext";
import React from "react";
import {AdminGameList} from "../../components/admin/Table/AdminGameList";

const Styled = styled.section`
  h1{
    text-align: center;
`

export const Admin = (props) => {

    return(
        <Styled>
            <h1>Welcome to admin panel!</h1>
            <br/>
            <GameCatalogProvider>
                <AdminGameList/>
            </GameCatalogProvider>
        </Styled>
    )
}