import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {

    return (
        <div className="Navigation mb-5">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark text-white">
                <div className="container collapse navbar-collapse" id="collapsibleNavId">
                    
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">HOME</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/sign-in' className="nav-link">SIGN IN</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/sign-up' className="nav-link">SIGN UP</Link>
                        </li>             
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default Nav;
