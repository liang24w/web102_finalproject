import React, { useState, useEffect } from 'react';
import { supabase } from '../client'
import { Link, useParams } from 'react-router-dom';
import LoadingPage from './LoadingPage';
import './PostInfo.css'
import upvoteLogo from '../assets/thumbsup.png'
import more from '../assets/greenmore.png'

const PostInfo = (props) =>  {

    const [posts, setPosts] = useState([]);
    const {id} = useParams();
    const [count, setCount] = useState(0);
    const [newComments, setComments] = useState([]);
    const [showPrompt, setShowPrompt] = useState(true);

    useEffect(() => {
        const fetchPost = async (event) => {

            const {data} = await supabase
                .from('Posts')
                .select('id, title, content, upvotes, comments, created_at')
                .eq('id', id)
                .limit(1)
                .single()

                // set state of posts
                setPosts(data);
                setCount(data.upvotes)
                setComments(data.comments)
        }
        fetchPost()
        // console.log(posts)
        // console.log(newComments)
    }, [props]);

    const updateCount = async (event) => {
        event.preventDefault();
      
        const data = await supabase
          .from('Posts')
          .update({ upvotes: (count+1)})
          .eq('id', id)
      
        setCount((count) => +count + 1);
      }

      const addComment = async (newCom) => {
        setComments([...newComments,newCom])
        // console.log(newComments)
      
        const data = await supabase
          .from('Posts')
          .update({comments: [...newComments,newCom]})
          .eq('id', id)

          setShowPrompt(false);
    
      }

      const submitComment = e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            let newCom = document.getElementById('commentInput').value
            // console.log(newComments)

            addComment(newCom)
            document.getElementById('commentInput').value = ''
        }
      }

    const timestamp = new Date(posts.created_at)
    const currentTime = new Date()
    const diffHours = Math.round((currentTime - timestamp) / (1000 * 60 * 60));

    return (
        <div>
            { posts && posts.id != null ?
                <div className="postSection">
                    <Link to={'../edit/'+ posts.id}><img className="moreButton" alt="edit button" src={more} /></Link>
                    <h2>{posts.title}</h2>
                    <p>{posts.content}</p>
                    <div className="likes">
                        <p>Posted {diffHours} hours ago</p>
                        <p style={{ display: 'flex', alignItems: 'center'}}><input type="image" src={upvoteLogo} className="upvote-icon" onClick={updateCount}/>
                        {count} upvotes</p>
                    </div>

                    <div className="commentSection">
                            { showPrompt && posts.comments.length === 0 && (<p>Be the first to leave a comment!</p>) }
                            <div>
                                <ul>
                                    {newComments.map((comment) => (
                                    <li>{comment}</li>))} 
                                </ul>
                                <input 
                                    id="commentInput"
                                    autoComplete="off"
                                    className="commentInput"
                                    type="text"
                                    onKeyDown={submitComment}
                                    placeholder="Leave a comment..."
                                />
                            </div>
                            
                    </div>

                    <Link to='/'><button className="back">Go Back</button></Link> 
                </div>
                :  <h3>{<LoadingPage />}</h3>
            }
        </div>
    )
}

export default PostInfo;