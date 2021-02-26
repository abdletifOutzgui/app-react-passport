import React from 'react';
import { Link } from 'react-router-dom';
import NavLoggedUser from '../Nav/NavLoggedUser';
import Nav from '../Nav/Nav';


const PageNotFound = () => {

    const access = localStorage.getItem('access_token');
    return (
        <div>
            {access ? <NavLoggedUser /> : <Nav /> }

            <div className="container">
                <h4>Ooops! Page Not Found.</h4>
                <Link to='/'>Back to Home</Link>
            </div>
        </div>
    )
}

export default PageNotFound;
