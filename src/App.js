import React from 'react';
import './App.css';
import Aside from './components/Aside';
import AddIdea from './components/AddIdea';
import Ideas from './components/Ideas';
import axios from 'axios';

class App extends React.Component {

  state = {
    ideas: [],
    stored: [],
    qualities: ['All Qualities', 'Swill', 'Plausible', 'Genius'],
    currentQuality: '',
    newQuality: '',
    stars: true,
    searchResult: '',
  }

  componentDidMount() {
    axios.get('https://my-json-server.typicode.com/hndfaw/api/ideas')
      .then(res => this.setState({ideas: res.data}))
  }

  upvote = (id) => {
    this.setState({ideas: this.state.ideas.map(idea => {
      if (idea.id === id) {
        const qualities = this.state.qualities;
        const currentIndex = qualities.indexOf(idea.quality);
        const nextIndex = ((currentIndex + 1) === qualities.length) ? 1 : currentIndex + 1;
        idea.quality = qualities[nextIndex];
      }
      return idea;
    })})
  }

  downvote = (id) => {
    this.setState({ideas: this.state.ideas.map(idea => {
      if (idea.id === id) {
        const qualities = this.state.qualities;
        const currentIndex = qualities.indexOf(idea.quality);
        const prevIndex = (currentIndex === 1) ? qualities.length - 1 : currentIndex - 1;
        idea.quality = qualities[prevIndex];
        
      }
      return idea
    })})
  }

  star = (id) => {
    this.setState({ideas: this.state.ideas.map(idea => {
      if (idea.id === id) {
        idea.star = !idea.star;
      }
      return idea
    })})
  }

  deleteIdea = (id) => {
    this.setState({ideas: [...this.state.ideas.filter(idea => {
      return idea.id !== id;
    })]})
  }

  addIdea = (title, body) => {
    let id = new Date().getTime();
    const newIdea = {
      id,
      title,
      body,
      star: false,
      quality: this.state.qualities[1]
    }
    this.setState({ideas: [...this.state.ideas, newIdea]})
  }

  filterStars = () => {
    this.setState({stars: !this.state.stars})

    if (this.state.stars === true) {
      this.setState({stored: [...this.state.ideas]})
      this.setState({ideas: [...this.state.ideas.filter(idea => idea.star === true)]})
    } else {
      this.setState({ideas: this.state.stored})
    }
  }

  currentQuality = (quality) => {
    this.setState({currentQuality: quality})
  }

  updateAddNewQuality = (e) => {
    this.setState({newQuality: e.target.value})
  }

  addNewQuality = (e) => {
    const {qualities, newQuality} = this.state;
    e.preventDefault();
    if (qualities.length <= 8) {
     this.qualityInputNotBlank(qualities, newQuality);
    } else {
      alert('You cannot add anymore qualities');
    }
  }

  qualityInputNotBlank = (qualities, newQuality) => {
    if (newQuality !== "") {
      this.verifyNewQuality(qualities, newQuality);
    }
  }

  verifyNewQuality = (qualities, newQuality) => {
    if (!qualities.includes(newQuality.toUpperCase()) && !qualities.includes(newQuality.toLowerCase())) {
      this.setState({qualities: [...qualities, newQuality]});
    this.setState({newQuality: ''});
    } else {
      alert('The quality already exist!');
    }
  }



  deleteQuality = (quality) => {
    if (this.state.qualities.length > 2) {
      this.setState({qualities: [...this.state.qualities.filter(q => 
        q !== quality 
      )]})
      this.updateIdeas(quality)
    } else {
      alert('You cannot remove all qualities...')
    }
    
    
  }

  updateIdeas = (quality) => {
    let x = this.state.qualities.indexOf(quality) > 1 ? 1 : 2;
    this.setState({ideas: this.state.ideas.map(idea => {
      if (idea.quality === quality) {
        idea.quality = this.state.qualities[x];
      }
      return idea;
    })})
  }

  getSearchTerm = (searchTerm) => {
    this.setState({searchResult: searchTerm})
  }

  render() {
    const {qualities, newQuality, stars, ideas, searchResult} = this.state;
    return (
      <div className="App">
        <Aside deleteQuality={this.deleteQuality} newQuality={newQuality} updateAddNewQuality={this.updateAddNewQuality} addNewQuality={this.addNewQuality} currentQuality={this.currentQuality} filterStars={this.filterStars} stars={stars} qualities={qualities} ideas={ideas}/>
        <main className="main">
          <AddIdea getSearchTerm={this.getSearchTerm} addIdea={this.addIdea}/>
          <Ideas searchTerm={searchResult} currentQuality={this.state.currentQuality} ideas={ideas} upvote={this.upvote} downvote={this.downvote} star={this.star} remove={this.deleteIdea}/>
        </main>
      </div>
    );
  }
}

export default App;
