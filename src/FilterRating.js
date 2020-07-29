import React, { Component } from 'react';
import './App.css';

class FilterRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
        ratMin: null,
        ratMax: null,
        
    }
  }

  filterRating = (event) => {
        
    let ratingMin = this.state.ratMin;
    let ratingMax = this.state.ratMax;
   
    //console.log("button was clicked",ratingMin, ratingMax)

    event.preventDefault()

    this.props.passRatingData(ratingMin,ratingMax);
    // this.props.setCloseAddState(closeAdd);

  }

  handleInputChange = (event) => {
    event.preventDefault()
    //console.log(event)
    //console.log(event.target.name)
    //console.log(event.target.value)

    this.setState({
        [event.target.id]: event.target.value
    });

  }
  
  render() {
    return (
        <div className="list-group-item message-filtering">
            <div className="col-sm-1">From: </div>
            <div className="col-sm-2"><input id="ratMin" type="number" min="0" max="5" steps="1"  onChange={this.handleInputChange}/></div>
            <div className="col-sm-1"> To:</div>
            <div className="col-sm-2"><input id="ratMax" type="number" min="0" max="5" steps="1"  onChange={this.handleInputChange}/></div>
            <div className="col-sm-2">    Stars</div>
            <button className="myButton" onClick={this.filterRating}>Filter</button>
            {this.props.filtering &&
              <div>
                <h4>These are the restaurants between {this.state.ratMin} and {this.state.ratMax} stars.</h4>
              </div>
            }
        </div>
    );
  }
}

export default FilterRating;
