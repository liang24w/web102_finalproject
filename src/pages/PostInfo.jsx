import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom';

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
            <p>This is post number {posts.id}! </p>
            <Link to='/home'><button className="back">Go Back</button></Link>
        </div>
    )
}

export default PostInfo;