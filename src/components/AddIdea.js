import React, { Component } from 'react';
import './styles/AddIdea.css';

class AddIdea extends Component {
  state = {
    title: '',
    body: '',
  }

  submitIdea = (e) => {
    e.preventDefault();
    if (this.state.title !== '' && this.state.body !== '') {
      this.props.addIdea(this.state.title, this.state.body);
      this.setState({title: ''});
      this.setState({body: ''});
    } else {
       alert('You need to add both title and body!')
    }
  }

  updateContent = (e) => {
    this.setState({[e.target.name]: e.target.value});

  }

  runSearching = (e) => {
    this.props.getSearchTerm(e.target.value);
  }

  render() {
    return (
      <div className="add-idea">
        <form className="add-idea-form">
          <div className="add-idea__title-container">
            <label className="label">Title</label>
            <input className="add-idea-title-input" name="title" onChange={this.updateContent} type="text" value={this.state.title}/>
          </div>
          <div className="add-idea__body-container">
            <label className="label">Body</label>
            <textarea name="body" onChange={this.updateContent} value={this.state.body}></textarea>
          </div>
          <button className="add-idea-save-btn" onClick={this.submitIdea}>Save</button>
        </form>
        <form className="search-idea-form">
          <input className="idea-search-input" type="text" placeholder="Search for ideas..." onChange={this.runSearching} name="search"/>
        </form>
      </div>
    )
  }
}

export default AddIdea
