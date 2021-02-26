import React, { useEffect, useState, useContext} from 'react'
import NavLoggedUser from '../Nav/NavLoggedUser';
import OnePost from './OnePost'
import { GlobalContext } from '../Context/GlobalContext'; 
import { Link } from 'react-router-dom';

const Posts = props => {
    const global = useContext(GlobalContext);     
    const message = null;

    useEffect(() => {
        global.fetchData();
    }, [])
    
    return (
        <div>
            <NavLoggedUser />

            <div className="container list_posts">
                <div className="d-flex justify-content-between">
                    <h2 className="text-uppercase text-underline">List of products</h2>
                    <Link to='/new/post' className="btn btn-success">ADD POST</Link>
                </div>

                {message && (
                    <div className="alert alert-success" role="alert">
                        <strong>{message}</strong>
                    </div>
                )}
                
                {global.state[0] && global.state[0].map(post => (
                    <OnePost 
                        key={post.id} 
                        post={post}
                        id={props.location.state ? props.location.state.user.id : null}
                    />                    
                ))}
            </div>
        </div>
    )
}

export default Posts;
