import React, { useEffect, useState} from 'react'
import axios from 'axios';
import NavLoggedUser from '../Nav/NavLoggedUser';

const Posts = (props) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = () => {
        axios.get("/posts", {
            headers: {
                'Content-Type' : 'application/json',
                'Accept'       : 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access_token')}`
            }
        })
        .then(resp => setPosts(resp.data))
        .catch(err => {
            if(err.response.status === 401){
                const refresh = localStorage.getItem("refresh_token");

                axios.post("/refresh",{ 'refresh_token' : refresh}, {
                    headers: {
                        'Accept'        : 'application/json',
                        'refresh_token' : refresh
                    }
                })
                .then(res => {
                    console.log("token refreshed")
                    localStorage.setItem('access_token', res.data.access_token);
                    localStorage.setItem('refresh_token', res.data.refresh_token);

                    axios.get("/posts", {
                        headers: {
                            'accept' : 'application/json',
                            'Authorization' : `Bearer ${localStorage.getItem('access_token')}`
                        }
                    })
                    .then(response => setPosts(response.data))
                    .catch(er => console.log("catch "+er))
                })
                .catch(error => {
                    localStorage.clear()
                    props.history.push('/sign-up')
                })
            }
        })
    }

    return (
        <div>
            <NavLoggedUser />
            <div className="container list_posts">
                <h2 className="text-uppercase text-underline">List of products</h2>
                
                {posts.map(post => (
                   
                    <div className="my-3 card" key={post.id}>
                        <div className="card-body">
                            <h4 className="card-title">{post.title}</h4>
                            <p className="card-text">{post.content}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Posts
