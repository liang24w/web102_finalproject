import React from 'react';
import './CreatePost.css'
import { useState } from 'react';
import { supabase } from '../client'

const CreatePost = () => {

    const [post, setPost] = useState({title: ""})

    const createPost = async (event) => {
        event.preventDefault();
      
        await supabase
          .from('Posts')
          .insert({title: post.title})
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
                <label for="name">Name</label> <br />
                <input autocomplete="off" type="text" id="name" name="name" placeholder="Enter crewmate's name" onChange={handleChange} /><br />
                <br/>

                <input type="submit" value="Submit" onClick={createPost} />
            </form>
        </div>
    )
}

export default CreatePost