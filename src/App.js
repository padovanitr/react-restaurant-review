import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './App.css';
import MapContainer from "./MapContainer";
import ListPlaces from "./ListPlaces";
import Infobox from "./InfoBox";
import InfoBoxGoogle from "./InfoBoxGoogle";
import InfoBoxAdded from './InfoBoxAdded';
import FilterRating from './FilterRating';
import AddReview from './AddReview';
import AddReviewGoogle from './AddReviewGoogle';
import AddReviewAdded from './AddReviewAdded';
import About from './About';


class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            showingInfoWindow: false,
            activeMarker: {},
            selectedPlace: {},
            place: null,
            position: null,
            placesgoogle: null,
            showBox: null,
            showBoxGoogle: null,
            showAddBox: null,
            setAddList: null,
            addedRest:[],
            showInfoBoxAdded: null,
            filtering: null,
            showAddReviewBox: null,
            showAddReviewGoogleBox: null,
            showAddReviewBoxAdded: null,
            showModal: false,
            showAbout: false,
            restaurants:  [
                {
                    id: 1,
                    "restaurantName": "Foz Restaurant",
                    "address_street": "Praça da liberdade",
                    "address_city": "4900-040, Viana do Catelo",
                    "lat": "41.69131057",
                    "long": "-8.82791623",
                    "showRating": false,
                    "ratings": [
                        {   
                            id: 1,
                            "rating": "4",
                            "stars": "4",
                            "comment": "Great! But not many veggie options."
                        },
                        {   
                            id: 2,
                            "rating": "5",
                            "stars": "5",
                            "comment": "My favorite restaurant!"
                        }
                    ]

                },
                {
                    id: 2,
                    "restaurantName": "Irish Restaurant",
                    "address_street": "Alameda 5 de Outubro, Cais da Marina",
                    "address_city": "4900-515, Viana do Castelo",
                    "lat": "41.693035",
                    "long": "-8.825000",
                    "showRating": false,
                    "ratings": [
                        {   
                            id: 1,
                            "rating": "4",
                            "stars": "4",
                            "comment": "Tiny pizzeria next to Sacre Coeur!"
                        },
                        {   
                            id: 2,
                            "rating": "3",
                            "stars": "3",
                            "comment": "Meh, it was fine."
                        }
                    ]
                },
                
                {
                    id: 3,
                    "restaurantName": "Scala Restaurant",
                    "address_street": "Av. do Atlântico",
                    "address_city": "4900-834, Viana do Castelo",
                    "lat": "41.693648",
                    "long": "-8.848073",
                    "showRating": false,
                    "ratings": [
                        {   id: 1,
                            "rating": "2",
                            "stars": "2",
                            "comment": "The pizza was good"
                        },
                        {   
                            id: 2,
                            "rating": "2",
                            "stars": "2",
                            "comment": "Meh, it was a little disorganized."
                        }
                    ]
                }

            ]

        };

        this.onMarkerClick = this.onMarkerClick.bind(this);
        //this.onClickSearch = this.onClickSearch.bind(this);
    
    }

    //close the street view
    onClickClose = () => {

        this.setState({
            selectedPlace: null,
            activeMarker: null,
            });

    }

    onClickBoxClose = () => {

        this.setState({
            showBox: null
        });

    }

    onClickBoxGoogleClose = () => {

        this.setState({
            showBoxGoogle: null
        });

    }

    onClickBoxAddedClose = () => {

        this.setState({
            showInfoBoxAdded: null
        });

    }

    onClickBoxAddReviewClose = () => {

        this.setState({
            showAddReviewBox: null,
            showAddReviewGoogleBox: null,
            showAddReviewBoxAdded: null
        });

    }

    onMarkerClick = (props, marker, e) => {
    
        let restaurantsCopy = [...this.state.restaurants];
        for (let index = 0; index < restaurantsCopy.length; index++) {
    
            if (restaurantsCopy[index].restaurantName === props.name) {
                restaurantsCopy[index].showRating = true;

            } else {
                restaurantsCopy[index].showRating = false;
            }
            
        }
        this.setState({
        selectedPlace: props,
        activeMarker: marker,
        showingInfoWindow: true,
        restaurants: [...restaurantsCopy]
        });

        //console.log(this.state.selectedPlace);
    }

    placesAppState = (place) => {
        this.setState({
            placesgoogle: place
        });
        //console.log(place);
    }

    // display info from JSON file
    displayPlacesInfo = (restaurantInfo) => {
       //console.log('the button clicked', restaurantInfo)

       //let {restaurantName, address_street} = restaurantInfo;

       //console.log(restaurantName, address_street);

       //console.log(restaurantInfo);

       this.setState({
            restaurantInfo,
            showBox: true,
            showBoxGoogle: null,
            showInfoBoxAdded: null

       });

    }

    // display info from google places API
    displayPlacesGoogleInfo = (restaurantGoogleInfo) => {
        //console.log(restaurantGoogleInfo);
        this.setState({
            restaurantGoogleInfo,
            showBoxGoogle: true,
            showBox: null,
            showInfoBoxAdded: null
            
        });

    }

    
    setData = () => {
        //console.log('button clicked')
        this.setState({
            setAddList: true
        });
        
    }

    //Function to receive the data of restaurants added
    // passAddToApp = (restNa, restAd, restCom, restRat) => {

    //     let newRestaurant = {restNa, restAd, restCom,restRat}

    //     let addedRest = this.state.addedRest;

    //     addedRest.push(newRestaurant);

    //     this.setState({
    //         addedRest,
    //         restNa,
    //         restAd,
    //         restRat,
    //         restCom,
    //         setAddList: true
    //     });

    //     //console.log(this.state.addedRest);
    // }

    passAddToApp = (newRest) => {

        let newRestaurant = newRest;

        let addedRest = this.state.addedRest;

        addedRest.push(newRestaurant);

        this.setState({
            addedRest,
            newRest,
            setAddList:true
        });

        this.setState({addedRest, setAddList:true}, () => {
            //console.log(this.state.addedRest);
        });
    }

    showInfoBoxAddedFunc = (restaurantAddedInfo) => {
        //console.log(restaurantAddedInfo);
        this.setState({
            showInfoBoxAdded: true,
            restaurantAddedInfo
        });
    }

    //function to receive the data of rating box
    passRatingData = (ratingMinAdd, ratingMaxAdd) => {

        console.log(ratingMinAdd, ratingMaxAdd)
        if (ratingMinAdd === null || ratingMaxAdd === null || ratingMinAdd === '' || ratingMaxAdd === '' ){
            //alert('Pass the two values to filter')
            this.setState({
                filtering: null,
                showRating: null,
                showBox: null,
                showBoxGoogle: null,
                showInfoBoxAdded: null,
                showAddReviewBox: null,
                showModal: true
            });

            
            
            
            
                
            

        } else {
            //console.log("rating data was passed", ratingMinAdd, ratingMaxAdd)
            this.setState({
                ratingMinAdd,
                ratingMaxAdd,
                filtering: true,
                showRating: true,
                showBox: null,
                showBoxGoogle: null,
                showInfoBoxAdded: null
            });
        }
        
        //Paths to get the ratings from the Added, Json and Places API
        //console.log("Rating added", ratingMinAdd, ratingMaxAdd);
        //console.log("Rating from JSON", this.state.restaurants[0].ratings[1].rating);
        //console.log("rating from Places API", this.state.placesgoogle[0].rating);
    }

    returnToHome = () =>{
        this.setState({
            filtering: null,
            showRating: null,
            showBox: null,
            showBoxGoogle: null,
            showInfoBoxAdded: null,
            showAddReviewBox: null,
            showAbout: false
        });
    }

    addReviewToRestaurant = () => {

        this.setState({
            showAddReviewBox: true,
            showBox: null,
            showBoxGoogle: null,
            showInfoBoxAdded: null
        });

    }

    addReviewToRestaurantAdded = () => {
        //console.log("add review to restaurant");
        this.setState({
            showAddReviewBox: null,
            showInfoBoxAdded: null,
            showAddReviewBoxAdded: true
        });
    }

    addReviewToRestaurantGoogle = ()=>{
        //console.log("the button works")
        this.setState({
            showAddReviewGoogleBox: true,
            showBox: null,
            showBoxGoogle: null,
            showInfoBoxAdded: null
        });

    }

    passReviewDataAdded = (newReviewAdded) => {
        //console.log(newReviewAdded);

        this.setState({
            newReviewAdded
        });

        //callback function to set the state of new reviews
        this.setState({
            newReviewAdded,
            showAddReviewBoxAdded: null,
            showInfoBoxAdded: true
        }, () => {
            //console.log(this.state.newReviewAdded);
        });

        let selectedAddedRest = this.state.restaurantAddedInfo;
        //console.log(selectedAddedRest);
        //console.log(selectedAddedRest.restreview);
        selectedAddedRest.restreview.push(newReviewAdded);
        //console.log(selectedAddedRest);
    }

    passReviewData = (newReview) => {
        
        //console.log("it´s passing the array",newReview);
        //console.log('the rating and comment was passed ' + ratingAdded + ' e ' + commentAdded)
        
        this.setState({
            newReview,
            showAddReviewBox: null,
            showBox: true
        });

        //callback function to set the state of new reviews
        this.setState({newReview}, () => {
            //console.log(this.state.newReview);
        });

        let selectedRest = this.state.restaurantInfo;
        selectedRest.ratings.push(newReview);
    
    }

    passReviewGoogleData = (newReviewGoogle) => {
        //console.log(newReviewGoogle);

        this.setState({
            newReviewGoogle,
            showAddReviewGoogleBox: null,
            showBoxGoogle: true
        });

        //callback function to set the state of new reviews
        this.setState({newReviewGoogle}, () => {
            //console.log(this.state.newReviewGoogle);
        });

        let selectedGoogleRest = this.state.restaurantGoogleInfo;

        //console.log(selectedGoogleRest);
        selectedGoogleRest.reviews.push(newReviewGoogle);
        //console.log(selectedGoogleRest);
        this.setState({
            selectedGoogleRest,
            newReviewGoogle
        });
    }

    closeModal = () => {
        this.setState({
            showModal: false
        })
    }

    goToAbout = () => {
        this.setState({
            showAbout: true
        })
    }


    render() {

    // let addedRestCom = this.state.addedRest.restreview.map((review)=>{
    //     return review.restcom
    // });
    
    return (
        <div>
            <header>
                <div className="container">
                    <div className="col-md-3">
                        <div className="logo">
                            <button onClick={this.returnToHome}>Restaurant Review</button>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="about">
                            <button className="about-button" onClick={this.goToAbout}>About</button>
                        </div>
                    </div>
                </div>
            </header>

            {this.state.showAbout ? 
                <About />
            :null}

            
            <div className="container">
                

                {/* <div className="search-div">
                    <input
                        id = "searchPlaces"
                        type = "text"
                        placeholder = "Search a location"
                    />
                    <button className="myButton">Search</button>
                </div> */}
              
                <div className="row content">
                    {!this.state.showAbout ?
                        <div className="col-sm-5">
                            <div className="message-filtering">
                                <FilterRating 
                                    filterRating = {this.filterRating}
                                    passRatingData = {this.passRatingData}
                                    filtering = {this.state.filtering}
                                />
                            </div>
                            <h4>Click on the map to add a restaurant</h4>
                        </div>
                    :null}

                    {this.state.showModal ?

                      
                        <Modal.Dialog>
                            <Modal.Header closeButton onClick={this.closeModal}>
                            </Modal.Header>

                            <Modal.Body>
                                <p>You must specify the two values to filter, please</p>
                            </Modal.Body>

                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.closeModal}>Close</Button>
                            </Modal.Footer>
                        </Modal.Dialog>
                        
                    : null}

                    <div className="col-sm-12" style={{marginLeft: '-80px'}}>
                        <div className="col-sm-9">

                            {this.state.showBox ?

                                <Infobox 
                                    restaurants = {this.state.restaurants}
                                    onClickBoxClose = {this.onClickBoxClose}
                                    displayPlacesInfo = {this.displayPlacesInfo}
                                    restaurantInfo = {this.state.restaurantInfo}
                                    addReviewToRestaurant = {this.addReviewToRestaurant}
                                    ratingAdded = {this.state.ratingAdded}
                                    commentAdded = {this.state.commentAdded}
                                />
                                
                            : null } 

                            {this.state.showBoxGoogle ?
                            
                                <InfoBoxGoogle
                                    placesgoogle = {this.state.placesgoogle}
                                    onClickBoxGoogleClose = {this.onClickBoxGoogleClose}
                                    displayPlacesGoogleInfo = {this.displayPlacesGoogleInfo}
                                    restaurantGoogleInfo = {this.state.restaurantGoogleInfo}
                                    reviews = {this.props.reviews}
                                    setReviewsState = {this.setReviewsState}
                                    addReviewToRestaurant = {this.addReviewToRestaurant}
                                    addReviewToRestaurantGoogle = {this.addReviewToRestaurantGoogle}
                                    newReviewGoogle = {this.state.newReviewGoogle}
                                    selectedGoogleRest = {this.state.selectedGoogleRest}
                                    ratingAdded = {this.state.ratingAdded}
                                    commentAdded = {this.state.commentAdded}
                                    
                                /> 

                            : null } 

                            {this.state.showInfoBoxAdded ? 

                                <InfoBoxAdded 
                                    showInfoBoxAddedFunc = {this.showInfoBoxAddedFunc}
                                    showInfoBoxAdded = {this.state.showInfoBoxAdded}
                                    addedRest = {this.state.addedRest}
                                    onClickBoxAddedClose = {this.onClickBoxAddedClose}
                                    addReviewToRestaurantAdded = {this.addReviewToRestaurantAdded}
                                    newReviewAdded = {this.state.newReviewAdded}
                                    restaurantAddedInfo = {this.state.restaurantAddedInfo}
                                />
                                
                            : null}

                            
                            {this.state.showAddReviewBox &&
                                <AddReview
                                    addReviewToRestaurant = {this.addReviewToRestaurant}
                                    onClickBoxAddReviewClose = {this.onClickBoxAddReviewClose}
                                    passReviewData = {this.passReviewData}
                                />
                            }

                            {this.state.showAddReviewBoxAdded &&
                                <AddReviewAdded
                                    addReviewToRestaurant = {this.addReviewToRestaurantAdded}
                                    onClickBoxAddReviewClose = {this.onClickBoxAddReviewClose}
                                    passReviewDataAdded = {this.passReviewDataAdded}
                                />
                            }

                            {this.state.showAddReviewGoogleBox &&
                                <AddReviewGoogle
                                    addReviewToRestaurantGoogle = {this.addReviewToRestaurantGoogle}
                                    passReviewGoogleData = {this.passReviewGoogleData}
                                    onClickBoxAddReviewClose = {this.onClickBoxAddReviewClose}
                                />
                            }

                            {!this.state.showAbout ? 
                                <MapContainer 
                                    onClickMarker = {this.onMarkerClick}
                                    selectedPlace = {this.state.selectedPlace}
                                    showingInfoWindow = {this.state.showingInfoWindow}
                                    activeMarker = {this.state.activeMarker}
                                    restaurants = {this.state.restaurants}
                                    onClickClose = {this.onClickClose}
                                    fetchPlaces = {this.fetchPlaces}
                                    place = {this.state.place}
                                    placesAppState = {this.placesAppState}
                                    onMapClick = {this.props.onMapClick}
                                    passAddToApp = {this.passAddToApp}
                                    reviews = {this.props.reviews}
                                    setReviewsState = {this.setReviewsState}
                                    filtering = {this.state.filtering}
                                    ratingMinAdd = {this.state.ratingMinAdd}
                                    ratingMaxAdd = {this.state.ratingMaxAdd}
                                />
                            
                            :null}
                            
                            

                        </div>
                   
                        <div className="col-sm-3">

                        
                            
    
                        
                            
                           {/* Show list restaurants from JSON */}
                        
                            {/* <List 
                                restaurants={this.state.restaurants}
                                showingInfoWindow = {this.state.showingInfoWindow}
                                activeMarker = {this.state.activeMarker}
                                displayPlacesInfo = {this.displayPlacesInfo}
                                onClickBoxClose = {this.onClickBoxClose}
                                restName = {this.props.restName}
                                filtering = {this.state.filtering}
                                ratingMinAdd = {this.state.ratingMinAdd}
                                ratingMaxAdd = {this.state.ratingMaxAdd}
                                passReviewData = {this.passReviewData}
                                ratingAdded = {this.state.ratingAdded}
                            /> */}

                            {/* Show list of restaurants Added */}
                            {!this.state.showAbout &&
                                <div className="list-group">
                                    <div className='list-title'>Restaurants</div>
                                </div>
                            }
                            

                            {this.state.setAddList && !this.state.showAbout ?

                                this.state.addedRest.map((item, index)=>{

                                    return(
                                        
                                            <div className="list-group-item" style={{textAlign: 'center'}}>
                                                <button onClick={() => {this.showInfoBoxAddedFunc(item)}}>
                                                    <h4 className="list-group-item-heading">{item.restna}</h4>
                                                    <p className="list-group-item-text" >{item.restad}</p>
                                                </button>
                                            </div>
                                        
                                    );
                                })
                            : null}

                        
                            {/* Show list restaurants from Places API */}
                            
                            {this.state.placesgoogle && !this.state.showAbout ?
                                <div>
                                    
                                    <ListPlaces 
                                        place={this.state.placesgoogle}
                                        displayPlacesGoogleInfo = {this.displayPlacesGoogleInfo}
                                        setReviewsState = {this.setReviewsState}
                                        reviewsPlace = {this.state.reviewsPlace}
                                        passReviewsItemPlaces = {this.passReviewsItemPlaces}
                                        filtering = {this.state.filtering}
                                        ratingMinAdd = {this.state.ratingMinAdd}
                                        ratingMaxAdd = {this.state.ratingMaxAdd}
                                    />
                                </div>
                            : null}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
  }
}
export default App;