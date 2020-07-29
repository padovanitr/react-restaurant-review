import React, {Component} from 'react';
import './App.css';
import Comment from "./Comments";

class InfoBoxAdded extends Component {
    
    render() {

        //console.log(this.props.addedRest[0].restRat)
        // let print = this.props.addedRest[0].restRat.map((rating) => {
        //     return <Comment stars={rating.stars} comment={rating.comment} key={rating.id}/>
        // });

        // let rating = this.props.restaurantAddedInfo.restreview.map((rating)=>{
        //     return rating.restrat
        // });

        // let print = <Comment stars={rating} />


        // let ratingAdded = this.props.restaurantAddedInfo.restreview.map((rating)=>{
        //     return rating.rating
        // });

        // let printAdded = <Comment stars={ratingAdded} />
        

        // let comment = this.props.restaurantAddedInfo.restreview.map((review)=>{
        //     return review.restcom
        // })

        return (
        
            <div className="infoBoxDiv" style={{
                    width: '50vw',
                    height: '18,5vh',
                    backgroundColor: '#fff',
                    marginLeft: 65
                    }}>
                
                    <div className="list-group-item">
                        <h3 className="list-group-item-heading">Name: {this.props.restaurantAddedInfo.restna}</h3>
                        <h4 className="list-group-item-text">Adress: {this.props.restaurantAddedInfo.restad}</h4>
                        <h4 className="list-group-item-text">Lat: 41.693648</h4>
                        <h4 className="list-group-item-text">Long: -8.848073 </h4> 
                        

                        {this.props.newReviewAdded || this.props.restaurantAddedInfo ?

                            this.props.restaurantAddedInfo.restreview.map((review)=>{
                                return (
                                    <div className="review-added">
                                        
                                        <Comment stars={review.restrat} />
                                        <p className="list-group-item-tex">{review.restcom}</p>
                                        
                                    </div>
                                )
                            })
                            
                        : null }
                        
                        
                    </div>
                
                    <button className="myButton" onClick={this.props.addReviewToRestaurantAdded}>Add Review</button>
                <button className='myButton' onClick={this.props.onClickBoxAddedClose}>Close</button>
               
            </div>
     
        )
    }
}

export default InfoBoxAdded;