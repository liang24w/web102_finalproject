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
                .from('Posts').select('id, title')
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
                <p>This is post number {posts.id}! <p>{posts.title}</p>
                <Link to='/'><button className="back">Go Back</button></Link> </p>
                :  <h3>{<LoadingPage />}</h3>
            }
        </div>
    )
}

export default PostInfo;