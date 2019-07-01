import React, { Component } from 'react';
import './styles/Idea.css';
import deleteIcon from '../images/delete.svg';
import starIcon from '../images/star.svg';
import starActive from '../images/star-active.svg';
import upvoteIcon from '../images/upvote.svg';
import downvoteIcon from '../images/downvote.svg';

class Idea extends Component {
  starImage = (starType) => {

    return starType === false ? starIcon : starActive;
  }

  render() {
    const {id , star, quality} = this.props.idea;
    const {idea, upvote, downvote, deleteItem} = this.props;
    return (
      <div className="idea">
        <div className="idea-header">
          <img onClick={this.props.star.bind(this, id)} role="button" src={this.starImage(star)} alt="star button" className="idea-btn"/>
          <img onClick={deleteItem.bind(this, id)} role="button" src={deleteIcon} alt="delete button" className="idea-btn"/>
        </div>

        <div className="idea-body">
          <h4 className="idea-body-title">{idea.title}</h4>
          <p className="idea-body-body">{idea.body}</p>
        </div>

        <div className="idea-footer">
          <img  onClick={upvote.bind(this, id)} role="button" src={upvoteIcon} alt="upvote button" className="idea-btn"/>
          <p>Quality: {quality}</p>
          <img onClick={downvote.bind(this, id)} role="button" src={downvoteIcon} alt="downvote button" className="idea-btn"/>
        </div>
      </div>
    )
  }
}

export default Idea
