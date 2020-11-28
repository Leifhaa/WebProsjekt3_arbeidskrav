import React, {useState} from 'react';
import {GameList} from "../components/game/catalog/GameList";
import {ProjectList} from "../components/project/ProjectList";

export const Projects = (props) => {
    const [name, setName] = useState()

    const onNameChange = ( e ) => {
        setName(e.target.value);
    }

    const addProject = () => {
        props.addProject(name)
    }

    return(
        <div>
            <h3>Projects:</h3>
            <ProjectList projects={props.projects} removeProject={props.removeProject} employees={props.employees} addMember={props.addMember} removeMember={props.removeMember} />
            <section>
                <p>Insert new project</p>
                <label>Name</label>
                <input onChange={ onNameChange } type="text"/>
                <input onClick={addProject} type="button" value="Add"/>
            </section>
        </div>
    )
}