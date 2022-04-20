import React from 'react'
import {Link} from "react-router-dom";

const Project = ({project}) => {
    return (
        <tr>
            <td>
                {project.id}
            </td>
            <td>
                <Link to={`project/${project.id}`}>{project.name}</Link>
            </td>
            <td>
                {project.users}
            </td>
            <td>
                {project.url}
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <table width={"100%"}>
            <th>
                Project ID
            </th>
            <th>
                Project Name
            </th>
            <th>
                Users
            </th>
            <th>
                Direct Link to API
            </th>
            {projects.map((project) => <Project project={project} />)}
        </table>
    )
}

export default ProjectList;