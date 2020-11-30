import React, {useContext} from "react";
import {GameCatalogContext} from "../../../context/GameCatalogContext";
import {AdminGameItem} from "./AdminGameItem";
import styled from "styled-components";
import {AdminGameCreate} from "./AdminGameCreate";


const StyledTable = styled.table`
      border:1px solid black;
      margin-left:auto;
      margin-right:auto;
      
      th, td{
          border: 1px solid #dddddd;
          text-align: left;
          padding: 8px;
      }
      tr:nth-child(even) 
        {
        background-color: #dddddd;
      }
  
`


export const AdminGameList = () => {
    const {games} = useContext(GameCatalogContext)
    //Retrieve games from the context
    const [gamesState] = games

    return (
        <StyledTable>
            <tbody>
            <tr>
                <th>Name</th>
                <th>Click to edit</th>
                <th>Click to delete</th>
            </tr>
            {gamesState.map((game, index) => {
                return (
                    <AdminGameItem key={index} game={game}/>
                )
            })
            }
            <AdminGameCreate/>
            </tbody>
        </StyledTable>
    )
}