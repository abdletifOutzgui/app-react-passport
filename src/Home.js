import React from 'react'
import Nav from './Nav/Nav'
import NavLoggedUser from './Nav/NavLoggedUser'

const Home = () => {
    const access = localStorage.getItem('access_token');
    return (
        <div>
            {access ? <NavLoggedUser /> : <Nav /> }

            <h3 className="mt-5">Our App Using React / laravel Passport.</h3>
        </div>
    )
}

export default Home;
