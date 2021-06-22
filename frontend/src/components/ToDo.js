import React from 'react'
import {Link} from "react-router-dom";

const ToDo = ({todo, deleteToDo}) => {
    return (
        <tr>
            <td>{todo.title}</td>
            <td>{todo.content}</td>
            <td>{todo.created}</td>
            <td>{todo.due_date}</td>
            <td>{todo.project}</td>
            <td>{todo.completed}</td>
            <td>{todo.created_by}</td>
            <td><button onClick={()=>deleteToDo(todo.id)}
                        type='button'>Delete</button></td>

        </tr>
    )
}

const ToDoList = ({todos, deleteToDo}) => {
    return (
        <div>
        <table width={"100%"}>

                <th>Task Name</th>
                <th>Content</th>
                <th>Created</th>
                <th>Due Date</th>
                <th>Project</th>
                <th>Completed</th>
                <th>Created By</th>
                <th></th>

            {todos.map((todo) => <ToDo todo={todo} deleteToDo={deleteToDo}/>)}
        </table>

        <Link to='/todos/create'>Create new ToDo</Link>

        </div>
    )
}

export default ToDoList;