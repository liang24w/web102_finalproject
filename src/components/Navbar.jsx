import React from 'react';
import { Link } from 'react-router-dom'
import './Navbar.css'
import simssocial from '../assets/simssocial.png'

const Navbar = () => {

    return (
        <div className="navbar">
            <div className="navtext"><img src={simssocial} height="30px"/></div>
            <div className="nav-item">
                <Link to=""><p>Home</p></Link>
                <Link to="/home/create"><p>Create Post</p></Link>
            </div>
        </div>
    )
};

export default Navbar;