import React from 'react'
import './Post.css'
import { Link } from 'react-router-dom'
import more from '../assets/greenmore.png'

const Card = (props) =>  {

  return (
      <div className="Card">
          <Link to={'edit/'+ props.id}><img className="moreButton" alt="edit button" src={more} /></Link>
          <Link to={'post/'+ props.id}><h2 className="name">{props.title}</h2></Link>
          {props.content}
          <div className="upvotes">
            {props.upvotes} upvotes
          </div>
      </div>
  );
};

export default Card;