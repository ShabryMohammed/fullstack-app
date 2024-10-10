import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/styles.css';

function Navbar() {
    return (
        <nav className="navbar">
            <ul className="navbar-list">
                <li className="navbar-item">
                    <Link to="/">Home</Link>
                </li>
                <li className="navbar-item">
                    <Link to="/create-user">Create User</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
