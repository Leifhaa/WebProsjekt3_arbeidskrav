import React, {useContext, useEffect, useState} from "react";
import {GameCatalogContext} from "../../../context/GameCatalogContext";
import styled from "styled-components";

//Can be low when sever is on local machine. Otherwise 500-700ms recommended
const executionDelayInMs = 100;


const StyledForm = styled.form`
  label{
    padding:10px;
  }
`


export const GameFilter = ({setFiltered}) => {
    const {games} = useContext(GameCatalogContext)
    const [gamesState] = games
    //0 - order by name, 1 - order by price, 2 - order by rating
    const [orderType, setOrderType] = useState(0)

    //Search properties
    let [tmpSearch, setTmpSearch] = useState("");
    let [delayTimeout, setDelayTimeout] = useState(0);

    useEffect(() => {
        let filtered = gamesState.filter(o => o.name.includes(tmpSearch))
        if (orderType === 0){
            //Order by name
            filtered.sort(function(a, b){
                if(a.name < b.name) { return -1; }
                if(a.name > b.name) { return 1; }
                return 0;
            });
        }
        else if (orderType === 1){
            //Order by price
            filtered.sort(function(a, b){
                if(a.price < b.price) { return -1; }
                if(a.price > b.price) { return 1; }
                return 0;
            });
        }
        else{
            //order by rating
            filtered.sort(function(a, b){
                if(a.ratingAvg > b.ratingAvg) { return -1; }
                if(a.ratingAvg < b.ratingAvg) { return 1; }
                return 0;
            });
        }
        setFiltered(filtered)
    }, [tmpSearch, gamesState, orderType])

    /*  Add delay for searching so we don't start searching immediate if there's a input in the search field
        I'm currently searching locally, but if there was multiple pages or many elements, a search via API would be more beneficial.
        A search delay will also limit calls to the API.
     */
    const doSearch = (txt) => {
        clearTimeout(delayTimeout);
        setDelayTimeout(setTimeout(() => setTmpSearch(txt), executionDelayInMs));
    }


    return (
        <StyledForm>
            <input style={{margin: "15px"}} onChange={e => doSearch(e.target.value)} type={"text"}
                   placeholder={"Search by name..."}/>
            <label>Order by:</label>
            <label>
                <input
                    type="radio"
                    value="Name"
                    checked={orderType === 0}
                    onChange={() => setOrderType(0)}
                />
                Name
            </label>
            <label>
                <input
                    type="radio"
                    value="Price"
                    checked={orderType === 1}
                    onChange={() => setOrderType(1)}
                />
                Price
            </label>
            <label>
                <input
                    type="radio"
                    value="Rating"
                    checked={orderType === 2}
                    onChange={() => setOrderType(2)}
                />
                Rating
            </label>
        </StyledForm>
    )
}