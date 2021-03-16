import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// https://thedutchlab.com/blog/using-axios-interceptors-for-refreshing-your-api-token
const URL = "http://localhost:3001/api";
export const GlobalContext = createContext();
export const GlobalProvider = props => {
   
    const [posts, setPosts] = useState([]);
    const headers = {         
        headers: { 
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "GET, PUT, POST, PATCH, DELETE, OPTIONS",
            'Access-Control-Request-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Accept': 'Application/json',
            'Content-Type': 'Application/json'
        }
    };

    const instance = axios.create();
    instance.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if(error.response.status === 403) {
             console.log("Redirection needed !");
        }
        return Promise.reject(error);
    });

    const fetchData = () => {
        axios.get(`${URL}/posts`, { withCredentials: true }, headers)
        .then(res => setPosts(res.data))
        .catch(error => {
            console.log(error)
            if(error.response.status === 401){
        
                axios.get(`${URL}/refresh`, { withCredentials: true}, headers)
                .then(res => {
        
                    console.log("Token refreshed")
                    console.log(res.data.refresh_token)
        
                    console.log('Old access token', localStorage.getItem('access_token'))
                    localStorage.setItem('access_token', res.data.access_token);
                    console.log('New access token', localStorage.getItem('access_token'))
        
                    axios.get(`${URL}/posts`)
                        .then(response => setPosts(response.data))
                        .catch(err => console.log(err))
                    })
                .catch(eror => {
                    console.log(eror)
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


