import React, { Component } from 'react';


class ListItemPlaces extends Component {


  render() {

    //console.log(this.props.place.id)

      return (
      <div className="list-group-item" key={this.props.place.id} style={{marginTop: '5px', borderRadius: 0}}>
        <button onClick={() => {this.props.displayPlacesGoogleInfo(this.props.place)}}>
          <h4 className="list-group-item-heading">{this.props.place.name}</h4>
          <p className="list-group-item-text">{this.props.place.vicinity}</p>
        </button>
      </div>

    );
  }
}

export default ListItemPlaces;
