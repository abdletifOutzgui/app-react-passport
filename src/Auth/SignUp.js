import React, { useState} from 'react'
import axios from 'axios';
import Nav from '../Nav/Nav'

const SignUp = props => {

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState({});

    const signUpUser = e => {
        e.preventDefault();

        const user = {
            name,
            email,
            password,
            password_confirmation
        }
        axios.post("/register", user, {
            headers: {
                'Content-Type' : 'application/json',
                'Accept'       : 'application/json'
            }
        })
            .then(resp => {
                console.log(resp.data)
                setErrors({})

                localStorage.setItem('access_token', resp.data.access_token)
                localStorage.setItem('refresh_token', resp.data.refresh_token)
                props.history.push('/posts')
            })
            .catch(err => setErrors(err.response.data.errors))
    }
    
    return (
        <div>
            <Nav />
            <div className="container sign_in">
                
                <form onSubmit={signUpUser}>

                    <h4 className="text-uppercase mb-3">Sign Up</h4>
                    <div className="form-group">
                        <input 
                            type="text" 
                            name="name" 
                            value={name}
                            onChange={ (e) => setName(e.target.value)}
                            className="form-control" 
                            placeholder="Your Name" 
                            autoFocus   
                        />
                        {errors.name && (
                            <p className="text-danger">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                    <input 
                            type="email" 
                            name="email" 
                            value={email}
                            onChange={ (e) => setEmail(e.target.value)}
                            className="form-control" 
                            placeholder="Your email" 
                            
                        />
                        {errors.email && (
                            <p className="text-danger">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                    <input 
                            type="password" 
                            name="password"
                            value={password}
                            onChange={ (e) => setPassword(e.target.value)} 
                            className="form-control" 
                            placeholder="Your Password" 
                            
                        />
                        {errors.password && (
                            <p className="text-danger">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="form-group">
                    <input 
                            type="password" 
                            name="password_confirmation"
                            value={password_confirmation}
                            onChange={ (e) => setPasswordConfirmation(e.target.value)} 
                            className="form-control" 
                            placeholder="Confirmation Password" 
                            
                        />
                    </div>

                    <input type="submit" className="btn btn-block btn-secondary" value="SIGN UP" />

                </form>
            </div>
        </div>
    )
}

export default SignUp
