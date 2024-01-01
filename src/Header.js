// Header.js

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = (name) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // You can perform any logout logic here
        // For example, clearing user authentication tokens, etc.

        // Redirect to the login page after logout
        navigate("/");
    };

    return (
        <div className="header">
            <nav>
                <ul>
                    <li>
                        <Link to="/">Register</Link>&nbsp;
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

export default Header;
