import React from 'react';
import Row from "react-bootstrap/Row";
import {PEmployee} from "./PEmployee";

//Displays employees within a project
export const PEmployeeList = (props) => {
    function getEmployees(){
        //Filter employees on the project.
        return props.employees.map((e, i) =>
            <PEmployee key={`pemp-${i}`} projectId={props.projectId} id={e.id} name={e.name} surname={e.surname} members={props.members} addMember={props.addMember} removeMember={props.removeMember}/>
        )
    }

    return (
        <div>
            {getEmployees()}
        </div>
    )
}