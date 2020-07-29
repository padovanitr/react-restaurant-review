import React, {Component} from 'react';
import './App.css';

class AddRest extends Component {
    constructor(props) {
        super(props);
        this.state = {
            restName: null,
            restAdress: null,
            restComment: null,
            setAddList: null,
            closeAdd: false,
            addRestaurant: {}
        }
      
    }

    handleSubmit = (event) => {
        
        // let restNa = this.state.restName;
        // let restAd = this.state.restAdress;
        // let restRat = this.state.restRating;
        // let restCom = this.state.restComment;
        let closeAdd = this.state.closeAdd;
        //let newRestaurant = [{restNa},{restAd},{restCom}]

        let newRest = {
            id: 1,
            restna: this.state.restName,
            restad: this.state.restAdress,
            restreview: [{
                
                restrat: this.state.restRating,
                restcom: this.state.restComment
            }]
        }

    
        event.preventDefault()
        //console.log(this.state.restName)
    
        //this.props.passRestData(restNa,restAd,restCom,restRat);
        this.props.passRestData(newRest);
        this.props.setCloseAddState(closeAdd);

    }


    handleInputChange = (event) => {
        event.preventDefault()
        //console.log(event)
        //console.log(event.target.name)
        //console.log(event.target.value)

        this.setState({
            [event.target.name]: event.target.value
        });

    }

    
    render() {
        // const {restName} = this.state
        // const {restAdress} = this.state
        // const {restComment} = this.state

        return (

            <div className="infoBoxDiv" style={{
                    width: '50vw',
                    height: '18,5vh',
                    backgroundColor: '#fff',
                    marginLeft: 70
                    }}>

             {/* list-group-item-text */}
                    <div className="list-group-item">
                        <h3 className="list-group-item-heading">Add a new Restaurant</h3>
                        {/* <p>Restaurant is: {restName} {restAdress} {restComment}</p> */}
                        <form onSubmit={this.handleSubmit}>
                            <p>Name:<input type="text" name="restName" placeholder="Name"  className="list-add-rest" onChange={this.handleInputChange} /></p><br></br>
                            <p>Adress:<input type="text" name="restAdress" placeholder="Adress" className="list-add-rest" onChange={this.handleInputChange}/></p><br></br>
                            <p>Rating:<input type="number" name="restRating" placeholder="0 to 5" className="list-add-rest-rating" onChange={this.handleInputChange}/></p><br></br>
                            <p>Comment:</p><textarea rows="4" cols="50" type="text" name="restComment" placeholder="Your comment" className="list-add-comment" onChange={this.handleInputChange}/>
                        </form>
                        
                    </div>
                    <div className="add-buttons">
                        <button type="submit" className="myButton" onClick={this.handleSubmit}>Add</button>
                        <button className='myButton' onClick={this.props.onClickCloseAddRest}>Cancel</button>
                    </div>
                
               
            </div>
     
        )
    }
}

export default AddRest;