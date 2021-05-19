import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

class Header extends React.Component
{
    render()
    {
        return (
            <nav class="navbar navbar-expand-sm bg-primary navbar-dark">
                <ul class="navbar-nav">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">USER LIST |</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">MENU ITEM 2 |</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="#">MENU ITEM 3 |</a>
                    </li>
                </ul>
            </nav>

        )
    }
}
export default Header;