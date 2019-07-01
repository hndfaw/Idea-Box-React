import React, { Component } from 'react';
import './styles/Quality.css';

class Quality extends Component {
  selectedQuality = () => {
      return {background: '#f16139',
      borderLeft: '6px solid #ec8d73',
      paddingLeft: '14px',
    };
  }

  numberOfEachQuality = () => {
    return this.props.qualities.map((quality, index) => {
      if (index !== 0) {
        let n = this.props.ideas.filter(idea => {
          return idea.quality === quality
        }).length
        return n;
      } else {
        return this.props.ideas.length
      }
    })
  }

  runSelectedQuality = (quality, i) => {
    let qualities = this.numberOfEachQuality();
    if (i === 0) {
      return <li style={this.selectedQuality()} id={quality} className="quality-item" key={i}>{quality} ({(qualities[i])})</li>
    } else {
      return <li style={this.selectedQuality()} id={quality} className="quality-item" key={i}>{quality} ({(qualities[i])})<span id={'delete' + quality} className="remove-quality">Delete</span></li>
    }
  }

  runUnselectedQualities = (quality, i) => {
    let qualities = this.numberOfEachQuality();
    if (i === 0) {
      return <li id={quality} className="quality-item" key={i}>{quality} ({qualities[i]})</li>
    } else {
      return <li id={quality} className="quality-item" key={i}>{quality} ({qualities[i]}) <span id={'delete' + quality} className="remove-quality">Delete</span></li>
    }
    
  }

  render() {
  const {qualities, currentQuality} = this.props
    return qualities.map((quality,i) => {
      if (quality === currentQuality) {
        return this.runSelectedQuality(quality, i)
      } else {
        return this.runUnselectedQualities(quality, i);
      }
        
    })
  }
}

export default Quality

