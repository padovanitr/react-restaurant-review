import React, {Component} from 'react';
import './App.css';
import Comment from "./Comments";

class InfoBoxGoogle extends Component {
    
    
    render() {

        let display = [];
        let count = this.props.restaurantGoogleInfo.rating;
        for (let i = 0 ; i < 5; i++){
            if (i<count){
                display.push(<span key={i} className="glyphicon glyphicon-star" aria-hidden="true"/>);
            } else {
                display.push(<span key={i} className="glyphicon glyphicon-star-empty" aria-hidden="true"/>);
            }
        }
        
        let print = this.props.restaurantGoogleInfo.reviews.map((review) => {
            return <Comment stars={review.rating} comment={review.text}/>
        });

        let reviewAddedStars = <Comment stars={this.props.ratingAdded} key={1} commentAdded = {this.props.commentAdded}/>
        
        let reviewLen = this.props.restaurantGoogleInfo.reviews;

        console.log(this.props.restaurantGoogleInfo);
     

        return (

            <div className="infoBoxDiv" style={{
                    width: '50vw',
                    height: '18,5vh',
                    backgroundColor: '#fff',
                    marginLeft: 65
                    }}>
                
                    <div className="list-group-item" key={this.props.restaurantGoogleInfo.id}>
                        <h3 className="list-group-item-heading">Name: {this.props.restaurantGoogleInfo.name}</h3>
                        <h4 className="list-group-item-text">Adress: {this.props.restaurantGoogleInfo.vicinity}</h4>
                        <h4 className="list-group-item-text">Lat: {this.props.restaurantGoogleInfo.geometry.viewport.La.g}</h4>
                        <h4 className="list-group-item-text">Long: {this.props.restaurantGoogleInfo.geometry.viewport.Ua.g}</h4>
                       
                        

                        {reviewLen.length >= 2 &&
                            <div>
                                <h4 className="list-group-item-text">Reviews: {print} </h4>
                                <hr></hr>
                            </div>
                        }

                        {this.props.ratingAdded && this.props.commentAdded &&
                            <div className="review-added">
                                {reviewAddedStars}
                                <p className="list-group-item-tex">{this.props.commentAdded}</p>
                            </div>
                        }
 
                    </div>
                    
                <button className="myButton" onClick={this.props.addReviewToRestaurantGoogle}>Add Review</button>
                <button className='myButton' onClick={this.props.onClickBoxGoogleClose}>Close</button>
               
            </div>
     
        )
    }
}

export default InfoBoxGoogle;