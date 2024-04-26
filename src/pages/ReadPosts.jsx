import React, { useState, useEffect } from 'react';
import Post from '../components/Post';
import { supabase } from '../client'
import LoadingPage from './LoadingPage';
import './ReadPosts.css'

const ReadPosts = (props) => {

    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [filteredResults, setFilteredResults] = useState([]);
    const [sortedResults, setSortedResults] = useState([]);
    const [updated, setUpdated] = useState(true)

    useEffect(() => {
        setPosts(props.data);
        const fetchPost = async (event) => {

            const {data} = await supabase
                .from('Posts')
                .select()
                .order('created_at', { ascending: false })

                // set state of posts
                setPosts(data);
                setSortedResults(data);
                setFilteredResults(data);
        }
        fetchPost()
        // console.log(posts)
    }, [props]);

    const searchItems = searchValue => {
        setSearchInput(searchValue);
        if (searchValue !== "") {
          const filteredData = sortedResults.filter(item => 
            typeof item.title === "string" && 
            item.title.toLowerCase().includes(searchValue.toLowerCase())
          );
          setFilteredResults(filteredData);
        } else {
          setFilteredResults(sortedResults);
        }
      };

      const sortNewest = () => {
        console.log("clicked Newest sort")
        setUpdated(!updated);

        sortedResults.sort((a, b) => b.created_at.localeCompare(a.created_at));
        setSortedResults(sortedResults);
        // console.log(sortedResults)
      }

      function sortPopular() {
        console.log("clicked Most Popular sort")
        setUpdated(!updated);

        sortedResults.sort((a, b) => b.upvotes - a.upvotes);
        setSortedResults(sortedResults);
        // console.log(sortedResults)
      }
    
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
                    <button className="sort" onClick={sortNewest}>Newest</button>
                    <button className="sort" onClick={sortPopular}>Most Popular</button> 
                </p>

            </div>

                {posts && posts.length > 0 ?
                    filteredResults.map((post,index) => 
                       <Post 
                        id={post.id} 
                        title={post.title} 
                        content={post.content} 
                        upvotes={post.upvotes} 
                        comments={post.comments} 
                        created_at={post.created_at}/>
                    ) :
                    <h3>{<LoadingPage />}</h3>
                }
            
            </div>
    )
}                               

export default ReadPosts;