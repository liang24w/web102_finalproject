import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { supabase } from '../client'
import LoadingPage from './LoadingPage';
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        setPosts(props.data);
        const fetchPost = async (event) => {
            // event.preventDefault();

            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false })

                // set state of posts
                setPosts(data);
        }
        fetchPost()
    }, [props]);
    
    return (
        <div className="ReadPosts">
            <div>
                
                <input 
                    className="searchBar"
                    type="text"
                    placeholder="Search Bar"
                />
                <p>
                    <button className="sort">Newest</button>
                    <button className="sort">Most Popular</button> 
                </p>

            </div>
            {
                posts && posts.length > 0 ?
                posts.map((post,index) => 
                   <Post id={post.id} title={post.title} content={post.content} upvotes={post.upvotes} comments={post.comments}/>
                ) : <h3>{<LoadingPage />}</h3>
            }
        </div>  
    )
}

export default ReadPosts;