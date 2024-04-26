import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { supabase } from '../client'
import LoadingPage from './LoadingPage';
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        setPosts(props.data);
        const fetchPost = async (event) => {

            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false })

                // set state of posts
                setPosts(data);
        }
        fetchPost()
        console.log(posts)
    }, [props]);

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
          const filteredData = posts.filter(item => 
            typeof item.title === "string" && 
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
          setFilteredResults(filteredData);
        } else {
          setFilteredResults(posts);
        }
      };
    
    return (
        <div className="ReadPosts">
            <div>
                
                <input 
                    className="searchBar"
                    type="text"
                    placeholder="Search posts by title..."
                    onChange={(inputString) => searchItems(inputString.target.value)}
                />
                <p>
                    {/* sort posts object by posts.created_at and posts.upvotes */}
                    <button className="sort">Newest</button>
                    <button className="sort">Most Popular</button> 
                </p>

            </div>
            
            {searchInput.length > 0
                ?
                filteredResults.map((post,index) => 
                   <Post id={post.id} title={post.title} content={post.content} upvotes={post.upvotes} comments={post.comments}/>
                )
                :
                posts && posts.length > 0 
                    ?
                    posts.map((post,index) => 
                        <Post id={post.id} title={post.title} content={post.content} upvotes={post.upvotes} comments={post.comments}/>
                    ) 
                    : 
                    <h3>{<LoadingPage />}</h3> 
                
            }
            </div>
    )
}
                                     
            // {
            //     posts && posts.length > 0 ?
            //     posts.map((post,index) => 
            //        <Post id={post.id} title={post.title} content={post.content} upvotes={post.upvotes} comments={post.comments}/>
            //     ) : <h3>{<LoadingPage />}</h3>
            // }

export default ReadPosts;