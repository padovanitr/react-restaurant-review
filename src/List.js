import React, { Component } from 'react';
import ListItem from "./ListItem";
import './App.css';

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ratingsStored: {}
    }
  }

  // && parseInt((this.props.ratingMinAdd),10) === 3 && parseInt((this.props.ratingMaxAdd),10) === 4

  // verifying using old added item: parseInt((oldRating),10) === parseInt((ratings.rating),10)
  render() {
    
    //let oldRating = null;

    let ratingsStored = [];

    let i = 0;

     if(this.props.filtering) {
       console.log('its filtering')
        let restaurant = this.props.restaurants.map((item)=>{

            return item.ratings.map((ratings)=>{

              if(ratingsStored.includes(item)) {

                  //console.log(item + " is already in the array");
                
              } else {
                  if(parseInt((ratings.rating),10) >= parseInt((this.props.ratingMinAdd),10) && parseInt((ratings.rating),10) <= parseInt((this.props.ratingMaxAdd),10)){
                    //console.log(ratings.rating);

                    ratingsStored.push(item);

                  
                    return (
                      <ListItem 
                        key ={i++}
                        restaurants={item} 
                        id={item.id} 
                        displayPlacesInfo = {this.props.displayPlacesInfo}
                        onClickBoxClose = {this.props.onClickBoxClose}
                        
                      />
                    
                    );

                } else {

                    return null
                      
                }

              }

            });

        });

      return (
        <div className="list-group">
            
            {restaurant}
          
        </div>
      );

        
     } else {

      let rows = this.props.restaurants.map((rest) => {
        //console.log(rows);

        return (
          <ListItem 
            key ={rest.id}
            restaurants={rest} 
            id={rest.id} 
            displayPlacesInfo = {this.props.displayPlacesInfo}
            onClickBoxClose = {this.props.onClickBoxClose}
            
          />
        );
      });
      
      return (
        <div className="list-group">
            
            {rows}
          
        </div>
        
      );
      
     }

  }
  
}


export default List;
