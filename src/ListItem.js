import React, { Component } from 'react';
import Comment from "./Comments";

class ListItem extends Component {
  constructor(props){
      super(props);
      this.state = {
        restaurants: this.props.restaurants
      }
  }


  render() {

      //const {key} = this.props.restaurants;
      if(this.props.ratingAdded){
        console.log(this.props.ratingAdded);
      }
      

      let array = this.props.restaurants.ratings;
      
      let i = 0;
      let print = array.map((rating, index) => {
          return <Comment stars={rating.stars} comment={rating.comment} key={i++}/>
      });
      return (
      
        <div className="list-group-item">
          <button onClick={() => {this.props.displayPlacesInfo(this.props.restaurants)}}>
            <h4 className="list-group-item-heading">{this.props.restaurants.restaurantName}</h4>
            <p className="list-group-item-text">{this.props.restaurants.address_street}</p>
            <p className="list-group-item-text">{this.props.restaurants.address_city}</p> 
          </button>
            
            {this.props.restaurants.showRating ? print : null}

           
        </div>

    );
  }
}

export default ListItem;
