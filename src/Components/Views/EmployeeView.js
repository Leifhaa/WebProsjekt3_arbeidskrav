import React from 'react';
import {EmployeeList} from "../Employee/EmployeeList";

export const EmployeeView = (props) => {
    return(
        <div>
            Current employee's:
            <EmployeeList employees={props.employees}/>
        </div>
    )
}