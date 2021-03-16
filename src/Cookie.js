import axios from 'axios'
import React from 'react'

const Cookie = () => {
    const headers = {  
        headers: { 
            'Access-Control-Allow-Origin': 'http://localhost:3000',
            'Access-Control-Allow-Credentials': true,
            "Access-Control-Allow-Methods": "GET, PUT, POST, PATCH, DELETE, OPTIONS",
            'Access-Control-Request-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
            'Accept': 'Application/json',
            'Content-Type': 'Application/json',
        }
    }
    const setCookie = () => {
        axios.get('http://localhost:3001/api/cookie/set', { withCredentials : true }, headers)
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    }

    const getCookie = () => {
        axios.get('http://localhost:3001/api/cookie/get', { withCredentials : true }, headers)
            .then(resp => console.log(resp))
            .catch(error => console.log(error))
    }

    return (
        <div>
            <button onClick={setCookie}>Set Cookie </button>
            <button onClick={getCookie}>Get Cookie </button>
        </div>
    )
}

export default Cookie;
