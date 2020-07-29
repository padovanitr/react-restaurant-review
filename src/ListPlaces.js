import React, { Component } from 'react';
import ListItemPlaces from "./ListItemPlaces";
import './App.css';

class ListPlaces extends Component {

    render() {

      let ratingsGoogleStored = [];

      if(this.props.filtering) {
        let restPlaces = this.props.place.map((rest)=>{
            //console.log(rest.rating);
          if(ratingsGoogleStored.includes(rest.rating)){

          } else {
                if(rest.rating >= parseInt((this.props.ratingMinAdd),10) && rest.rating <= parseInt((this.props.ratingMaxAdd),10)){
                  //console.log(rest.rating);
                  //console.log(rest)
                  ratingsGoogleStored.push(rest.rating);
                  
                  return (
                      <ListItemPlaces 
                        key = {rest.id}
                        place = {rest} 
                        id = {rest.id}
                        displayPlacesGoogleInfo = {this.props.displayPlacesGoogleInfo}
                        reviewsPlace = {this.props.reviewsPlace}
                      />
                  );

              } else {

                return null
              }
          }
  
        });

        return (
          <div className="list-group">
              {/* <div className='list-title'>Places</div> */}
              {restPlaces}
            
          </div>
        );

      } else {

        let row = this.props.place.map((place, index) => {
          //console.log(place);
           return (
             <ListItemPlaces 
                key = {place.id}
                place = {place}
                displayPlacesGoogleInfo = {this.props.displayPlacesGoogleInfo}
                reviewsPlace = {this.props.reviewsPlace}
            
             />
           );
        });
        return (
          <div className="list-group">
              {/* <div className='list-title'>Places</div> */}
              {row}
            
          </div>
        );

      }
  
  }
}

export default ListPlaces;
