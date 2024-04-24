import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {

    return (
        <div className="navbar">
            SimsSocial
            <div className="nav-item">
                <Link to="/home"><p>Home</p></Link>
                <Link to="/home/create"><p>Create Post</p></Link>
            </div>
        </div>
    )
};

export default Navbar;