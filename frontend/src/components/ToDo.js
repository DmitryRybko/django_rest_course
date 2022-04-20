import React from 'react'

const ToDo = ({todo}) => {
    return (
        <tr>
            <td>
                {todo.title}
            </td>
            <td>
                {todo.content}
            </td>
            <td>
                {todo.created}
            </td>
            <td>
                {todo.due_date}
            </td>
            <td>
                {todo.project}
            </td>
            <td>
                {todo.completed}
            </td>
            <td>
                {todo.created_by}
            </td>
        </tr>
    )
}

const ToDoList = ({todos}) => {
    return (
        <table width={"100%"}>

                <th>
                    Task Name
                </th>
                <th>
                    Content
                </th>
                <th>
                    Created
                </th>
                <th>
                    Due Date
                </th>
                <th>
                    Project
                </th>
                <th>
                    Completed
                </th>
                <th>
                    Created By
                </th>

            {todos.map((todo) => <ToDo todo={todo} />)}
        </table>
    )
}

export default ToDoList;