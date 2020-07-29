import React, { Component } from 'react';
import github from './assets/img/github.png';
import linkedin from './assets/img/linkedin.png';

class About extends Component {
    constructor(props){
        super(props);
        this.state = {

        }
    }

    render(){
        return(
            <div className="container">
                <p className="presentation">This is a website made in react by Thiago Padovani</p>

                <div className="row">
                    <div className="col-md-1">
                        <a href="https://github.com/padovanitr" target="blank">
                            <img className="social-media" src={github} alt=""/>
                        </a>
                    </div>
                    <div className="col-md-1">
                        <a href="https://www.linkedin.com/in/thiago-padovani/" target="blank">
                            <img className="social-media" src={linkedin} alt=""/>
                        </a>
                    </div>
                </div>
                
            </div>


        )
    }
}

export default About;