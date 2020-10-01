import React from 'react';
import {EmployeeList} from "../Employee/EmployeeList";

export const EmployeeView = (props) => {
    return(
        <div>
            <h3>Current employee's:</h3>
            <EmployeeList employees={props.employees} removeEmployee={props.removeEmployee}/>
        </div>
    )
}