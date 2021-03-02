import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';


const SignIn = props => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const header = {
        headers: {
            'Content-Type' : 'Application/json',
            'Accept'       : 'Application/json'
        }
    }
    const signInUser = (e) => {
        e.preventDefault();

        const user = {
            email, password
        }
        axios.post("/login", user, header)
            .then(response => {

                console.log('sign in '+response)
                setErrors({})
                
                localStorage.setItem('access_token', response.data.data.access_token)
                localStorage.setItem('refresh_token', response.data.data.refresh_token)

                history.push({
                    pathname: '/posts',
                    state: { user: response.data.user}
                })
            })
          
            .catch(err => setErrors(err.response.data.errors))
    }
    return (
        <div>
            <Nav />
            <div className="container sign_in">
                <h4 className="text-uppercase mb-3">Sign In</h4>

                <form onSubmit={signInUser}>
                    <div className="form-group">
                    <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={ e => setEmail(e.target.value)}
                            className="form-control" 
                            placeholder="Your email" 
                            autoFocus
                        />
                        {errors.email && (
                            <p className="text-danger">{errors.email}</p>
                        )}
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            name="password"
                            value={password}
                            onChange={ e => setPassword(e.target.value)} 
                            className="form-control" 
                            placeholder="Your Password" 
                        />
                        {errors.password && (
                            <p className="text-danger">{errors.password}</p>
                        )}
                    </div>

                    <input type="submit" className="btn btn-block btn-primary" value="SIGN IN" />

                </form>
            </div>
        </div>
    )
}

export default SignIn;
