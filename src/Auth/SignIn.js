import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import Nav from '../Nav/Nav';


const apiUrl = 'http://localhost:3001';

axios.interceptors.request.use(
    config => {
        const { origin } = new URL(config.url);
        const allowedOrigins = [apiUrl];
        const token = localStorage.getItem('access_token');

        if (allowedOrigins.includes(origin)) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

    
const SignIn = props => {

    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const signInUser = async (e) => {

        e.preventDefault();
        
        const user = {
            email, password
        }
        const { data } = await axios.post(`${apiUrl}/api/login`, user);
        localStorage.setItem('access_token', data.data.access_token);

        console.log(data);    
        history.push({
            pathname: '/posts',
            state: { user: data.user}
        })
    };
   
    
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
