import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'

const Card = (props) =>  {

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src="https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes-3/3/87-512.png" /></Link>
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