import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';

const PostInfo = (props) =>  {

    const [posts, setPosts] = useState([]);
    const {id} = useParams();

    useEffect(() => {
        setPosts(props.data);
        const fetchPost = async (event) => {

            const {data} = await supabase
                .from('Posts').select('id, title, content, upvotes, comments')
                .eq('id', id)
                .limit(1)
                .single()

                // set state of posts
                setPosts(data);
        }
        fetchPost()
        console.log(posts)
    }, [props]);

    return (
        <div>
            { posts && posts.id != null ?
                <div className="postSection">
                    <p>{posts.title}</p>
                    <p>{posts.content}</p>
                    <p>{posts.upvotes} upvotes</p>

                    <div className="commentSection">
                        <p>
                            {posts.comments.map((comment) => (
                            <li key={posts.id}>{comment}</li>))}
                        </p>
                    </div>
                    
                    <Link to='/'><button className="back">Go Back</button></Link> 
                </div>
                :  <h3>{<LoadingPage />}</h3>
            }
        </div>
    )
}

export default PostInfo;