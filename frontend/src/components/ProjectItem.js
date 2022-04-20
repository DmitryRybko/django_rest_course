import React from 'react'
import { useParams } from 'react-router-dom'

const TaskItem = ({todo}) => {
    return (
        <tr>
            <td>{todo.title}</td>
            <td>{todo.content}</td>
            <td>{todo.created}</td>
            <td>{todo.due_date}</td>
            <td>{todo.completed}</td>
            <td>{todo.created_by}</td>
        </tr>
    )
}


const ProjectDetail = ({items}) => {

    let { id } = useParams();
    console.log(id)
    console.log(items)
    let filtered_items = items.filter((item) => item.project === parseInt(id))
    console.log(filtered_items)
    return (
        <div>
            <h3>Project {id} Tasks</h3>
            <table width={"100%"}>
                <tr>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Created</th>
                    <th>Due Date</th>
                    <th>Completed</th>
                    <th>Created By</th>
                </tr>
                <tr>

                </tr>

                {filtered_items.map((item) => <TaskItem todo={item} />)}
            </table>
        </div>
    )
}

export default ProjectDetail