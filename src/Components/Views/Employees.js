import React, {useState} from 'react';
import {EmployeeList} from "../Employee/EmployeeList";

export const Employees = (props) => {
    const [name, setName] = useState()
    const [surname, setSurname] = useState()

    const onNameChange = ( e ) => {
        setName(e.target.value);
    }

    const onSurnameChange = ( e ) => {
        setSurname(e.target.value);
    }

    const addEmployee = () => {
        props.addEmployee(name, surname)
    }

    return(
        <div>
            <h3>Current employee's:</h3>
            <EmployeeList employees={props.employees} removeEmployee={props.removeEmployee}/>
            <section>
                <p>Insert new employee</p>
                <label>Name</label>
                <input onChange={ onNameChange } type="text"/>
                <label>Surname</label>
                <input onChange={onSurnameChange} type="text"/>
                <input onClick={addEmployee} type="button" value="Add"/>
            </section>
        </div>
    )
}