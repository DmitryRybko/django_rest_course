import React from 'react'

const User = ({user}) => {
    return (
        <tr>
            <td>
                {user.email}
            </td>
            <td>
                {user.first_name}
            </td>
            <td>
                {user.last_name}
            </td>
        </tr>
    )
}

const UserList = ({users}) => {
    return (
        <table>
            <th>
                E-mail
            </th>
            <th>
                First Name
            </th>
            <th>
                Last Name
            </th>
            {users.map((user) => <User user={user} />)}
        </table>
    )
}

export default UserList;