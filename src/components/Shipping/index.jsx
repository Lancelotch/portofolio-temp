import React, { Component } from "react";
import Shippings from "./Shippings";
import dummyShipping from "../../dummy/dummyShipping";

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: []
    };
  }

  async componentDidMount() {
    this.shipping();
  }

  shipping = async () => {
    try {
      const res = await dummyShipping;
      this.setState({
        shipping: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <React.Fragment>
        <Shippings shipping={this.state.shipping} />
      </React.Fragment>
    );
  }
}

export default Shipping;
