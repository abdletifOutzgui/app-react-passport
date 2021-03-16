import axios from 'axios';
import React from 'react';
import { withRouter, useHistory, NavLink } from 'react-router-dom';
import './Nav.css';

const NavLoggedUser = () => {
    
    let history = useHistory();

    const logout = () => {
        axios.post('http://localhost:3001/api/logout', { withCredentials: true })
            .then(resp => {
                console.log(resp.data.message)
                localStorage.clear()
                history.push('/sign-in')
            })
            .catch(error => console.log(error))
    }
    
    return (
        <div className="Navigation mb-5">
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark text-white">
                <div className="container collapse navbar-collapse" id="collapsibleNavId">
                    
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <NavLink  exact activeClassName="text-success" to='/' className="nav-link">HOME</NavLink>
                        </li>
                        <li className="nav-item active">
                            <NavLink  activeClassName="text-success" to='/posts' className="nav-link">POSTS</NavLink>
                        </li>
                        <li className="nav-item active">
                            <p onClick={logout} className="nav-link">LOGOUT</p>
                        </li>             
                    </ul>
                </div>
            </nav>
        </div>
    )
}

export default withRouter(NavLoggedUser);
