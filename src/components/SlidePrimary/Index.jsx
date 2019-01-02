import React, { Component } from "react";
import { Carousel } from "antd";
import "./style.sass";

class SliderPrimary extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Carousel autoplaySpeed>
          <div>
            <img src="http://hellobagus.com/monggotest/monggopesen-slide-02.png" />
          </div>
          <div>
            <img src="http://hellobagus.com/monggotest/monggopesen-slide-03.png" />
          </div>
          <div>
            <img src="http://hellobagus.com/monggotest/monggopesen-slide-01.png" />
          </div>
        </Carousel>
      </div>
    );
  }
}

export default SliderPrimary;
