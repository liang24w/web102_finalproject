import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import './PostInfo.css'
import upvoteLogo from '../assets/thumbsup.png'

const PostInfo = (props) =>  {

    const [posts, setPosts] = useState([]);
    const {id} = useParams();
    const [count, setCount] = useState(0);

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
                setCount(data.upvotes)
        }
        fetchPost()
        console.log(posts)
    }, [props]);

    const updateCount = async (event) => {
        event.preventDefault();
      
        const data = await supabase
          .from('Posts')
          .update({ upvotes: (count+1)})
          .eq('id', id)
      
        setCount((count) => +count + 1);
      }

    return (
        <div>
            { posts && posts.id != null ?
                <div className="postSection">
                    <h2>{posts.title}</h2>
                    <p>{posts.content}</p>
                    <div className="likes">
                        <input type="image" src={upvoteLogo} className="upvote-icon" onClick={updateCount}/>
                        <p>{count} upvotes</p>
                    </div>

                    <div className="commentSection">
                        <p>
                            { posts && posts.comments != null ? 
                            <div>
                                <ul>
                                    {posts.comments.map((comment) => (
                                    <li key={posts.id}>{comment}</li>))} 
                                </ul>
                                <input 
                                    className="commentInput"
                                    type="text"
                                    placeholder="Leave a comment..."
                                />
                            </div>
                            : 
                            <div>Be the first to leave a comment!
                                <input 
                                    className="commentInput"
                                    type="text"
                                    placeholder="Leave a comment..."
                                />
                            </div>}
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