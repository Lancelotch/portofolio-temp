import React, { Component } from "react";
import "./style.sass";



class Benefit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      imageUrl: this.props.imageUrl
    };
  }
  render() {
    return (
        <div className='benefit-box'>
            <p>
                <img src={this.state.imageUrl} alt=''/>
                <span>{this.state.title}</span>
            </p>
        </div>
    );
  }
}

export default Benefit;
