import React, { useEffect, useState} from 'react';
import NavLoggedUser from '../Nav/NavLoggedUser'
import axios from 'axios';
import {withRouter} from 'react-router-dom';

const ShowPost = (props) => {

    const [post, setPost] = useState({});
    useEffect(() => {
        getPost()
    }, [])

    const getPost = () => {
        const id = props.match.params.id;
        
        axios.get(`http://localhost:3001/api/posts/${id}`)

        .then(response => setPost(response.data))
        .catch(error => {
            if(error.response.status === 401){
                props.history.push('/sign-in')
            }
            if(error.response.status === 404){
               alert('Post Not Found')
               props.history.push('/posts')
            }
        })

    }
    return (
        <div>
            <NavLoggedUser />
            <div className="container card">
                <div className="card-body">
                    <h4 className="card-title">{post.title}</h4>
                    <p className="card-text">{post.content}</p>
                </div>
            </div>           
        </div>
    )
}

export default withRouter(ShowPost);
