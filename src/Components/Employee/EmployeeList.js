import React from 'react';
import {Employee} from './Employee';

export const EmployeeList = (props) => {
    function getEmployees(){
        return props.employees.map((e, i) => {
            return <Employee key={`emp-${i}`} name={e.name} position={e.position}/>
        })
    }

    return <section>
        {getEmployees()}
    </section>

}

