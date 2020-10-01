import React from 'react';
import {Employee} from './Employee';

export const EmployeeList = (props) => {
    function getEmployees(){
        return props.employees.map((e, i) =>
            <Employee key={`emp-${i}`} id={e.id} name={e.name} surname={e.surname} removeEmployee={props.removeEmployee}/>
        )
    }

    return (
        <div className={"card-deck"}>
            {getEmployees()}
        </div>)

}

