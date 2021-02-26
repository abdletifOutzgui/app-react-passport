import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

const OnePost = props => {

    // Delete Post
    const deletePost = id => {
        if(window.confirm("Do you want really delete this post ?")) {
            axios.delete(`/posts/${id}`, {
                headers: {
                    'Accept' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                }
            })
            .then(res => {
                props.history.push('/posts')
            })
            .catch(err => console.log(err))
        }
    };

    return (
        <>
            <div className="my-3 card">
                <div className="card-body">
                    <Link to={`/posts/${props.post.id}`} className="h4 card-title">{props.post.title.toUpperCase()}</Link>
                    <p className="mt-2 card-text">{props.post.content}</p>
                </div>
            </div>

            {props.post.user_id === props.id ? (
                <div className="mb-3">
                    <button onClick={() => deletePost(props.post.id)} className="btn btn-danger btn-sm mx-2">DELETE</button>
                    <Link to={`/posts/${props.post.id}/edit`} className="btn btn-primary btn-sm ">EDIT</Link>
                </div> 
            ) : null}
                     
        </>
    )
}

export default withRouter(OnePost);
