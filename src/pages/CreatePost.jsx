import React from 'react';
import './CreatePost.css'
import { useState } from 'react';
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: "", content:""})

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title, content: post.content})
          .select();
      
        window.location = "/";
      }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setPost( (prev) => {
            return {
                ...prev,
                [name]:value,
            }
        })
    }

    return (
        <div>
            <form>

                <input 
                    className="titleText"
                    autoComplete="off" 
                    type="text" 
                    id="title" 
                    name="title" 
                    placeholder="Enter title of post" 
                    onChange={handleChange} /><br />
                <br/>

                <textarea 
                    className="contentText"
                    autoComplete="off" 
                    id="content" 
                    name="content" 
                    rows="6"
                    placeholder="Enter content of post" 
                    onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost