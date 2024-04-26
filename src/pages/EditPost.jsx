import React from 'react';
import { useParams } from 'react-router-dom';
import './EditPost.css'
import { useState, useEffect } from 'react';
import { supabase } from '../client'
import LoadingPage from './LoadingPage';

const EditPost = ({props}) => {

    const {id} = useParams();
    const [post, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async (event) => {

            const {data} = await supabase
                .from('Posts')
                .select('id, title, content')
                .eq('id', id)
                .limit(1)
                .single()

                // set state of posts
                setPosts(data);
        }
        fetchPost()
        console.log(post)
    }, [props]);

    const updatePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .update({ title: post.title, content: post.content})
            .eq('id', id);

        window.location = "/";
    }

    const deletePost = async (event) => {
        event.preventDefault();

        await supabase
            .from('Posts')
            .delete()
            .eq('id', id);

        window.location = "http://localhost:5173/";
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPosts( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            { post && post.id != null ?
            <form>

                <input 
                    className="titleText"
                    autoComplete="off" 
                    type="text" 
                    id="title" 
                    name="title" 
                    value={post.title} 
                    placeholder="Enter title of post"
                    onChange={handleChange} /><br />
                <br/>

                <textarea  
                    className="contentText"
                    autoComplete="off" 
                    id="content" 
                    name="content" 
                    value={post.content} 
                    rows="6"
                    onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={updatePost}/>
                <button className="deleteButton" onClick={deletePost}>Delete</button>
            </form>
            : <h3>{<LoadingPage />}</h3>}
        </div>
    )
}

export default EditPost;