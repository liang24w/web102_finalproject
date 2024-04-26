import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import more from '../assets/greenmore.png'

const Card = (props) =>  {

  const timestamp = new Date(props.created_at)
  const currentTime = new Date()
  const diffHours = Math.round((currentTime - timestamp) / (1000 * 60 * 60));

  return (
      <div className="Card">
        <div>
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
        </div>
          <Link to={'post/'+ props.id}><h2 className="name">{props.title}</h2></Link>
          <div>{props.content}</div>
          
          <div className="upvotes">
            <p>Posted {diffHours} hours ago</p>
            <p>{props.upvotes} upvotes</p>
          </div>
      </div>
  );
};

export default Card;