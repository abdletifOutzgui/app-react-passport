import React, { useState } from 'react'
import axios from 'axios';
import NavLoggedUser from '../Nav/NavLoggedUser';

const NewPost = props => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const token = localStorage.getItem('access_token');
    const header = {
        headers: {
            'Content-Type' : 'application/json',
            'Authorization' : 'Bearer ' +token
        }
    }
    // Add New Post
    const newPost = e => {
        e.preventDefault();

        if(!title || !content){
            return alert('Oops! All fields are required')
        }else {
            const post = { title, content };
            axios.post('/posts', post, header)
                .then(res => props.history.push('/posts'))
                .catch(error => console.log(error))
        }
    }
    return (
        <div>
            <NavLoggedUser />
            <div className="container">
                <form onSubmit={ newPost }>
                    <div className="form-group">
                        <label htmlFor="title">Title :</label>
                        <input 
                            type="text" 
                            name="title"
                            value={title} 
                            onChange={ e => setTitle(e.target.value)}
                            id="content" 
                            className="form-control"  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content :</label>
                        <input 
                            type="text" 
                            name="content"
                            value={content} 
                            onChange={ e => setContent(e.target.value)}
                            id="content" 
                            className="form-control"  
                        />
                    </div>
                    <input type="submit" className="btn btn-block btn-primary" value="NEW Post" />
                </form>
            </div>
        </div>
    )
}

export default NewPost
