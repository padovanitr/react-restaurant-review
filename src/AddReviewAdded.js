import React, {Component} from 'react';
import './App.css';

class AddReviewAdded extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRating: null,
            addComment: null
        }
    }

    handleSubmit = (event) => {

        let newReviewAdded = {
            id: 2,
            restrat: this.state.addRating,
            restcom: this.state.addComment
        }

        //console.log(newReviewAdded);

        event.preventDefault()

        //console.log(this.state.addRating, this.state.addComment)
    
        // this.props.passReviewData(this.state.addRating, this.state.addComment);
        this.props.passReviewDataAdded(newReviewAdded);
       
        //this.props.setCloseAddState(closeAdd);
    }

    handleChange = (event) => {
        event.preventDefault()
        //console.log(event)
        //console.log(event.target.name)
        //console.log(event.target.value)

        this.setState({
            [event.target.name]: event.target.value
        });

    }
    
    render() {

        return (

            <div className="infoBoxDiv" style={{
                    width: '50vw',
                    height: '18,5vh',
                    backgroundColor: '#fff',
                    marginLeft: 65
                    }}>

             {/* list-group-item-text */}
                    <div className="list-group-item">
                        <h3 className="list-group-item-heading">Add a Review</h3>
                        {/* <p>Restaurant is: {restName} {restAdress} {restComment}</p> */}
                        <form onSubmit={this.handleSubmit}>
                           
                            <p>Rating:<input type="number" name="addRating" placeholder="0 to 5" className="list-add-rest-rating" onChange={this.handleChange}/></p><br></br>
                            <p>Comment:</p><textarea rows="4" cols="50" type="text" name="addComment" placeholder="Your comment" className="list-add-comment" onChange={this.handleChange}/>
                        </form>
                        
                    </div>
                <button className="myButton" onClick={this.handleSubmit}>Add</button>
                <button className="myButton" onClick={this.props.onClickBoxAddReviewClose}>Cancel</button>
                {/* <button className='myButton' onClick={this.props.onClickCloseAddRest}>Cancel</button> */}
               
            </div>
     
        )
    }
}

export default AddReviewAdded;