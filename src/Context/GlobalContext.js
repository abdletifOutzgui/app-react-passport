import React, { createContext, useState } from 'react';
import axios from 'axios';


export const GlobalContext = createContext();
export const GlobalProvider = props => {
    
    const [posts, setPosts] = useState([]);
    
    const fetchData = () => {
        
        
        axios.get("http://localhost:3001/api/posts")
            .then(resp => setPosts(resp.data))
            .catch(error => {
            console.log(error)
            if(error.response.status === 401){
                const refresh = localStorage.getItem("refresh_token");

                axios.post("http://localhost:3001/api/refresh", { 'refresh_token' : refresh}, {
                    headers: {
                        'Accept'        : 'application/json',
                        'refresh_token' : refresh
                    }
                })
                .then(res => {
                    console.log("token refreshed")
                
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);

                    axios.get("http://localhost:3001/api/posts", {
                        headers: {
                            Authorization   : `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })
                        .then(response => setPosts(response.data))
                        .catch(err => console.log(err))
                })
                .catch(eror => {
                    localStorage.clear()
                    window.location.href = '/sign-in'
                })
            }
        })
    }
    return (
        <GlobalContext.Provider value={{ 
            state     : [posts, setPosts], 
            user      : '1',
            fetchData : fetchData
        }}>{props.children}</GlobalContext.Provider>
    );
}


