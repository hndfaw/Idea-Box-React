import React, { Component } from 'react';
import './styles/Aside.css';
import Quality from './Quality.js';

export class Aside extends Component {
  state = {
    selectedQuality: 'All Qualities',
    newQualit: '',
  }

  btnStyle = () => {
      return  { backgroundColor: this.props.stars === false ? '#f16139' : '#5356a4'}
  }

  changeQuality = (e) => {
    if (!e.target.id.includes('delete')) {
      this.setState({selectedQuality: e.target.id});
    this.props.currentQuality(e.target.id);
    } else {
      let quality = e.target.id.slice(6)
      this.props.deleteQuality(quality);
    }
  }

  updateAddNewQuality = (e) => {
    this.setState({newQuality: e.target.value})
  }

  render() {
    const {ideas, filterStars, qualities, newQuality, updateAddNewQuality, addNewQuality} = this.props;
    return (
      <div className="aside">
        <h1 className="aside-header">IdeaBox Redux</h1>
        <div className="filter-star-ideas-container">
          <label className="aside-label">Filter Starred Ideas</label>
          <button style={this.btnStyle()} onChange={this.btnStyle} onClick={filterStars} className="filter-star-ideas-btn">Show Stared Ideas</button>
        </div>
        <div className="filter-by-quality-container">
          <label className="filter-by-quality-label">Filter by Quality</label>
          <ul onClick={this.changeQuality} className="list-qualities">
            <Quality ideas={ideas} currentQuality={this.state.selectedQuality}  qualities={qualities}/>
          </ul>
        </div>
        <div className="add-new-quality-container">
          <label className="aside-label">New Quality</label>
          <input className="add-new-quality-input" value={newQuality} type="text" onChange={updateAddNewQuality}/>
          <button onClick={addNewQuality} className="filter-star-ideas-btn">Add New Quality</button>
        </div>
      </div>
    )
  }
}

export default Aside
