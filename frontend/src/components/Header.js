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
                        <a class="nav-link" href="/">USER LIST |</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/projects">PROJECTS |</a>
                    </li>
                    <li className="nav-item active">
                        <a className="nav-link" href="/todos">TODOs |</a>
                    </li>
                </ul>
            </nav>

        )
    }
}
export default Header;
