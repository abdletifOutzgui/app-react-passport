import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import './Nav.css';

const navLoggedUser = (props) => {

    const logout = () => {
       
        localStorage.clear()
        props.history.push('/sign-up')
    }
    return (
        <div className="Navigation mb-5">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark text-white">
                <div className="container collapse navbar-collapse" id="collapsibleNavId">
                    
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <Link to='/' className="nav-link">HOME</Link>
                        </li>
                        <li className="nav-item active">
                            <Link to='/posts' className="nav-link">POSTS</Link>
                        </li>
                        <li className="nav-item active">
                            <p onClick={logout} className="nav-link">LOG OUT</p>
                        </li>             
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(navLoggedUser);
