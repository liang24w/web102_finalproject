import React from 'react'
import './Post.css'
import more from './more.png'
import { Link } from 'react-router-dom'

const Card = (props) =>  {

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <Link to={'post/'+ props.id}><h2 className="name">{props.title}</h2></Link>
          {props.content}
          <div className="upvotes">
            {/* <img src="https://cdn3.iconfinder.com/data/icons/basicolor-votting-awards/24/210_vote_like_up_upvote-512.png" className="upvote-icon"/> */}
            {props.upvotes} upvotes
          </div>
      </div>
  );
};

export default Card;