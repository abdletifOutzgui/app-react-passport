import React, {useState, useEffect} from 'react';
import NavLoggedUser from '../Nav/NavLoggedUser';
import axios from 'axios';

const EditPost = props => {

    const [post, setPost] = useState({
        title: '',
        content: ''
    });

    useEffect(() => {
        getPost();
    }, [])

    const id = props.match.params.id;
    
    const getPost = () => {

        axios.get(`/posts/${id}`, {
            headers: {
                'Content-Type' : 'Application/json',
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(response => setPost(response.data))
        .catch(error => {
            if (error.response.status == 401) {
                props.history.push('/sign-in')
            }
        })
    }

    const updatePost = e => {
        e.preventDefault();

        axios.put(`/posts/${id}`, post, {
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(res => {
            console.log(res)
            props.history.push({
                pathname: '/posts',
                query : { message : 'Post was updated !'}
            })
        })
        .catch(err => {
            console.log(err)
            if (err.response.status === 401) {
                props.history.push('/sign-in')
            }
        })
    }
    return (
        <div>
            <NavLoggedUser />            
            <div className="container">

                <form onSubmit={ updatePost }>
                    <div className="form-group">
                        <label htmlFor="title">Title :</label>
                        <input 
                            type="text" 
                            name="title"
                            value={post.title} 
                            onChange={ e => setPost({...post, title: e.target.value } )}
                            id="content" 
                            className="form-control"  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="content">Content :</label>
                        <input 
                            type="text" 
                            name="content"
                            value={post.content} 
                            onChange={ e => setPost({...post, content: e.target.value} )}
                            id="content" 
                            className="form-control"  
                        />
                    </div>
                    
                    <input type="submit" className="btn btn-block btn-success" value="Update Post" />
                </form>
            </div>
        </div>
    )
}

export default EditPost;
