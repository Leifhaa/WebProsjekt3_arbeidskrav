import Row from "react-bootstrap/Row";
import React from 'react';
import {Project} from "./Project";


export const ProjectList = (props) => {
    function getProjects(){
        return props.projects.map((e, i) =>
            <Project key={`proj-${i}`} id={e.id} name={e.name} details={e.details} members={e.members} removeProject={props.removeProject} employees={props.employees} addMember={props.addMember} removeMember={props.removeMember}/>
        )
    }

    return (
        <Row>
            {getProjects()}
        </Row>
    )
}