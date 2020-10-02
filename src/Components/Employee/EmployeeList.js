import React from 'react';
import {Employee} from './Employee';
import Row from "react-bootstrap/Row";

export const EmployeeList = (props) => {
    function getEmployees(){
        return props.employees.map((e, i) =>
            <Employee key={`emp-${i}`} id={e.id} name={e.name} surname={e.surname} description={e.description} removeEmployee={props.removeEmployee}/>
        )
    }

    return (
        <Row>
            {getEmployees()}
        </Row>
    )
}

