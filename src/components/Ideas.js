import React, { Component } from 'react';
import './styles/Ideas.css';
import Idea from './Idea';

class Ideas extends Component {

  render() {
    const {currentQuality, ideas, upvote, star, downvote, remove} = this.props;
    let qQuality = currentQuality || 'All Qualities';

    let dataA = ideas.filter(idea => {
      return (qQuality !== 'All Qualities') ? idea.quality === qQuality : idea.quality;
    })

    let dataB  = dataA.filter(idea => {
      return idea.body.includes(this.props.searchTerm.toUpperCase()) || idea.title.includes(this.props.searchTerm.toUpperCase()) || idea.body.includes(this.props.searchTerm.toLowerCase()) || idea.title.includes(this.props.searchTerm.toLowerCase())
    })

    return <div className="ideas"> {dataB.map(idea => {
      return <Idea key={idea.id} idea={idea} upvote={upvote} downvote={downvote} star={star} deleteItem={remove}/>
    })} </div>
   
  }
}

export default Ideas
