import React, {Component} from 'react';
import './App.css';
import Comment from "./Comments";

class InfoBox extends Component {
    
    render() {

        //console.log(this.props.restaurants)
        let print = this.props.restaurantInfo.ratings.map((rating) => {
            return <Comment stars={rating.stars} comment={rating.comment} key={rating.id}/>
        });

        let reviewAddedStars = <Comment stars={this.props.ratingAdded} key={1} commentAdded = {this.props.commentAdded}/>


        return (

            <div className="infoBoxDiv" style={{
                    width: '50vw',
                    height: '18,5vh',
                    backgroundColor: '#fff',
                    marginLeft: 65
                    }}>
            
                    <div className="list-group-item">
                        <h3 className="list-group-item-heading">Name: {this.props.restaurantInfo.restaurantName}</h3>
                        <h4 className="list-group-item-text">Adress: {this.props.restaurantInfo.address_street}, {this.props.restaurantInfo.address_city}</h4>
                        <h4 className="list-group-item-text">Lat: {this.props.restaurantInfo.lat}</h4>
                        <h4 className="list-group-item-text">Long: {this.props.restaurantInfo.long}</h4> 
                        <h4 className="list-group-item-text">Reviews: {print}</h4> 

                        {/* Add the new review */}
                        {this.props.ratingAdded && this.props.commentAdded &&
                            <div className="review-added">
                                {reviewAddedStars}
                                <p className="list-group-item-tex">{this.props.commentAdded}</p>
                            </div>
                        }
                        
                    </div>
                <button className="myButton" onClick={this.props.addReviewToRestaurant}>Add Review</button>
                <button className='myButton' onClick={this.props.onClickBoxClose}>Close</button>
               
            </div>
     
        )
    }
}

export default InfoBox;