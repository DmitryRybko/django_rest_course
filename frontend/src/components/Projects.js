import React from 'react'
import {Link} from "react-router-dom";

const Project = ({project, deleteProject}) => {
    return (
        <tr>
            <td>{project.id}</td>
            <td><Link to={`project/${project.id}`}>{project.name}</Link></td>
            <td>{project.users}</td>
            <td>{project.url}</td>
            <td><button onClick={()=>deleteProject(project.id)} type='button'>Delete</button></td>
        </tr>
    )
}

const ProjectList = ({projects, deleteProject}) => {
    return (
        <div>
        <table width={"100%"}>
            <thead>
                <tr>
                    <th>Project ID</th>
                        <th>Project Name</th>
                        <th>Users</th>
                        <th>Direct Link to API</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {projects.map((project) => <Project key={project.id} project={project} deleteProject={deleteProject} />)}
            </tbody>
        </table>
        <Link to='/projects/create'>Create</Link>
        </div>
    )
}

export default ProjectList;