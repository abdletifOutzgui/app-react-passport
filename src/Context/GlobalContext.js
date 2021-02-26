import React, { createContext, useState } from 'react';
import axios from 'axios';


export const GlobalContext = createContext();
export const GlobalProvider = props => {

    const [posts, setPosts] = useState([]);

    const token = localStorage.getItem('access_token');
    const authAxios = axios.create({
        headers: {
           Authorization: `Bearer ${token}`
        }
    })
   

    const fetchData = () => {

        authAxios.get("/posts")
        .then(resp => setPosts(resp.data))
        .catch(error => {

            if(error.response.status === 401){
                const refresh = localStorage.getItem("refresh_token");

                axios.post("/refresh", { 'refresh_token' : refresh}, {
                    headers: {
                        'Accept'        : 'application/json',
                        'refresh_token' : refresh
                    }
                })
                .then(res => {
                    console.log("token refreshed")
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);

                    authAxios.get("/posts")
                        .then(response => setPosts(response.data))
                        .catch(err => console.log("catch " +err))
                })
                .catch(eror => {
                    localStorage.clear()
                    window.location.assign('/sign-in')
                })
            }
        })
    }
    return (
        <GlobalContext.Provider value={{ 
            state     : [posts, setPosts],
            fetchData : fetchData
         }}>
            {props.children}
        </GlobalContext.Provider>
    );
}


