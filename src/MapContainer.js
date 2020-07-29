import React from 'react';
import { GoogleApiWrapper, Map, Marker } from 'google-maps-react';
import './App.css';
import ReactStreetview from 'react-streetview';
import AddRest from "./AddRest";


class GoogleMapsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      zoom: 14,
      ready: false,
      where: {lat:null, lng:null},
      error: null,
      position: null,
      selectedPos: null,
      streetViewPanoramaOptions: null,
      showAddBox: null,
      test: null
      
    }

    // binding this to event-handler functions
    this.onMapClick = this.onMapClick.bind(this);
    this.onClose = this.onClose.bind(this);
    //this.onPlacesClick = this.onPlacesClick.bind(this);
  }


  onClose = (props) => {
    //console.log(props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }

  //create a marker by clicking on the map
  onMapClick = (latLng, map) => {
    new window.google.maps.Marker({
      position: latLng, 
      map: map
    });

    this.setState({
      showAddBox: true
    });

    
  }

  //closes the box to add a new restaurant
  onClickCloseAddRest = () => {
    this.setState({
      showAddBox: null,
      map: true
    });

  }

  displayLocationInfo = (position) => {
    const lng = position.coords.longitude;
    const lat = position.coords.latitude;
    const pos = {
      lat: lat,
      lng: lng
    }
  
    //console.log(`longitude: ${ lng } | latitude: ${ lat }`);
    this.setState({position: pos});
  }

  handleError = () => {
    const error = document.getElementById('root');
    error.innerHTML = "Don´t support geolocation";
  }

  componentWillReceiveProps(nextProps) {

    if (nextProps.selectedPlace) {

      if (this.props.selectedPlace !== nextProps.selectedPlace) {

        let gotLat = parseFloat(nextProps.selectedPlace.position.lat);
        let gotLng = parseFloat(nextProps.selectedPlace.position.lng);

        //console.log(gotLat, gotLng);

        let options = {
          position: {lat: gotLat, lng: gotLng},
          pov: {heading: 100, pitch: 0},
          zoom: 1
        };

        //console.log(options);

        this.setState({
          streetViewPanoramaOptions: options
        });

      }
      
    }
  }


  componentDidUpdate(prevProps, prevState) {
    if (this.props.selectedPlace) {

      if (this.props.selectedPlace !== prevProps.selectedPlace) {

        let gotLat = parseFloat(this.props.selectedPlace.position.lat);
        let gotLng = parseFloat(this.props.selectedPlace.position.lng);
  
        //console.log(gotLat, gotLng);
  
        let options = {
          position: {lat: gotLat, lng: gotLng},
          pov: {heading: 100, pitch: 0},
          zoom: 1
        };
  
        //console.log(options);

        this.setState({
          streetViewPanoramaOptions: options
        });
      }
    }
  }
  
  
  componentDidMount(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(this.displayLocationInfo, this.handleError);
    }

    if (this.props.selectedPlace.position) {

      let gotLat = parseFloat(this.props.selectedPlace.position.lat);
      let gotLng = parseFloat(this.props.selectedPlace.position.lng);

      //console.log(gotLat, gotLng);

      let streetViewPanoramaOptions = {
        position: {lat: gotLat, lng: gotLng},
        pov: {heading: 100, pitch: 0},
        zoom: 1
      };

      this.setState({
        streetViewPanoramaOptions
      });
      //console.log(streetViewPanoramaOptions);
    }
  }
  


  fetchPlaces = (mapProps, map) => { 
    //console.log(this.state.position);
    var pyrmont = new window.google.maps.LatLng(this.state.position.lat,this.state.position.lng);
    //console.log(pyrmont);
    var request = {
      location: pyrmont,
      radius: '1000',
      type: ['restaurant']
    };
    //console.log(request);
  
    let service = new window.google.maps.places.PlacesService(map);

    service.nearbySearch(request, (results, status) => {
      if (status === mapProps.google.maps.places.PlacesServiceStatus.OK) {
        //console.log(results)
        let places = [];

        for (let index = 0; index < results.length; index++) {
          let element = results[index];

          //console.log(element);
          service.getDetails({placeId: element.place_id}, (place, status)=>{
            //console.log(place);
            if (status === mapProps.google.maps.places.PlacesServiceStatus.OK) {
              
              places.push(place);

              this.setState({
                ...this.state,
                place: places
              
              });
              
              this.props.placesAppState(places);
              //console.log(this.state.reviews)
            }
            //this.props.setReviewsState(this.state.reviews);
          });

        }
     
      }

    })   

  }


  // passRestData = (restNa, restAd, restCom, restRat) => {
  //   this.setState({
  //     restNa,
  //     restAd,
  //     restCom,
  //     restRat
  //   });

  //   //console.log(restNa,restAd,restCom);

  //   this.props.passAddToApp(restNa,restAd,restCom,restRat);

  // }

  passRestData = (newRest)=>{
    this.setState({
      newRest
    });

    this.props.passAddToApp(newRest);
  }

  setCloseAddState = (closeAdd) => {
    this.setState({
      showAddBox: closeAdd
    });
  }


 
  render() {

    if(!this.state.position){
      return <div>Loading Map...</div>;
    }
    

    const googleMapsApiKey = 'AIzaSyD8oKLh-p7_hSxhSg03u_nRkN2RPYpl720';

    
    const style = {
      width: '50vw',
      height: '75vh',
      'marginLeft': 'auto',
      'marginRight': 'auto'
    }

    let ratingsStored = [];
    let ratingsGoogleStored = [];

    
    //console.log(this.state.streetViewPanoramaOptions.lat);

    return (
      <div>

      <div className="info-box hvr-underline-reveal box-dashboard">
      <div className="info-box-content-half text-center">

      {this.state.showAddBox ?
        <AddRest 
          onClickCloseAddRest = {this.onClickCloseAddRest}
          onMapClick = {this.onMapClick}
          handleSubmit = {this.handleSubmit}
          passRestData = {this.passRestData}
          setCloseAddState = {this.setCloseAddState}
        />
      : null}
      

      <Map
        item
        xs = { 12 }
        style = { style }
        google = { this.props.google }
        onClick={(t, map, c) => this.onMapClick(c.latLng, map)}
        zoom = { 15 }
        initialCenter = {{ lat: this.state.position.lat, lng: this.state.position.lng }}
        onReady={this.fetchPlaces}
      >

  
      {this.state.streetViewPanoramaOptions && this.props.selectedPlace ?
        <div style={{
                  width: '50vw',
                  height: '75vh',
                  backgroundColor: '#eeeeee',
                  //marginTop: 485,
                  marginLeft: 108

              }}>
              
              <ReactStreetview
                  apiKey={googleMapsApiKey}
                  streetViewPanoramaOptions={this.state.streetViewPanoramaOptions}
              />
          <button className='myButton' onClick={this.props.onClickClose}>Close</button>
          

          </div>
          
        : null } 
      
        
        {/* !!!!!!!! SAFETY COPY: RENDER MARKERS FOR GOOGLE PLACES !!!!!!!!!! */}
        {/* {this.state.place ? this.state.place.map((item, index) => (
          <Marker
            key = {index}
            name = {item.name}
            position = {item.geometry.location}
            onClick = {this.onPlacesClick}
            
          />
        )) : null} */}


        {/* Creates markers to the places nearby */}
        {this.props.filtering ? 
          //console.log("it's filtering the google places")
          this.state.place.map((item, index)=>{
            //console.log(item.rating);
            if(ratingsGoogleStored.includes(item.rating)){
              //console.log(item.rating + " is in the array")
            } else {
              //console.log(item.rating + " is not in the array")
              if(item.rating >= this.props.ratingMinAdd && item.rating <= this.props.ratingMaxAdd){
                //console.log("it can be rendered")
                ratingsGoogleStored.push(item.rating);
                return (
                  <Marker
                    key = {index}
                    name = {item.name}
                    position = {item.geometry.location}
                    onClick = {this.onPlacesClick}
                  />
                )

              } else {
                //console.log("it cant be rendered")
              }
            }
          })
        :

        this.state.place ? this.state.place.map((item, index) => (
          <Marker
            key = {index}
            name = {item.name}
            position = {item.geometry.location}
            onClick = {this.onPlacesClick}
            
          />
        )) : null}
        
        

      
        {/* NOTE: IT'S GOING TO VERIFY IF IT'S FILTERING. I PUT THE CONDITION OF FILTERING INSIDE THE 
        FIRST IF AND THEN IF NOT FILTER NORMALLY THE MARKERS */}
        {/* Add markers for the json file */}
        
        {this.props.filtering ? 
          //console.log("it's filtering")
          this.props.restaurants.map((item, index)=>{
            return item.ratings.map((ratings)=>{
                if(ratingsStored.includes(item)) {
                    //console.log(rest + "is already in the array");
                } else {
                    //console.log("it´s not in the array");
                    if(parseInt((ratings.rating),10) >= parseInt((this.props.ratingMinAdd),10) && parseInt((ratings.rating),10) <= parseInt((this.props.ratingMaxAdd),10)){
                      ratingsStored.push(item);
                      //console.log(item + "can be rendered");
                      //render the ones that can be rendered
                      return(
                        <Marker 
                          key = {index}
                          name = {item.restaurantName}
                          position = {{lat: item.lat, lng:item.long }}
                          onClick = { this.props.onClickMarker }
                        />
                      )
                      

                    } else {
                      //console.log("it cant be rendered")
                    }
                    
                }
            })
          })
        : 

        this.props.restaurants.map((item, index) => (
          <Marker 
            key = {index}
            name = {item.restaurantName}
            position = {{lat: item.lat, lng:item.long }}
            onClick = { this.props.onClickMarker }
          />

        ))}
        
        

        {/* Add a marker for the current position */}
        <Marker
          onClick = { this.props.onClickMarker }
          position = {{ lat: this.state.position.lat, lng: this.state.position.lng }}
          name = { 'Current position' }
          icon = {"http://maps.google.com/mapfiles/ms/icons/blue.png"}
         
        />
        
         
        {/* {this.props.selectedPlace ?
        <InfoWindow
          marker = { this.props.activeMarker }
          visible = { this.props.showingInfoWindow }
        
        >
            <div>
              
              <h5>{this.props.selectedPlace.name}</h5>
            
            </div>
        </InfoWindow>
        : null}  */}

      </Map>
      
      </div>
      </div>
      </div>
    
    );
  }
}


export default GoogleApiWrapper({
  apiKey: ("AIzaSyD8oKLh-p7_hSxhSg03u_nRkN2RPYpl720")
})(GoogleMapsContainer)