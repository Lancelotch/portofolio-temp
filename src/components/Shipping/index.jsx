import React, { Component } from "react";
import Shippings from "./Shippings";
// import dummyShipping from "../../dummy/dummyShipping";
import shipping from "../../api/services/shipping";

class Shipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: []
    };
  }

  componentDidMount() {
    this.shipping();
  }

  shipping = async () => {
    try {
      const res = await shipping.getShipping();
      // const res = await dummyShipping;
      this.setState({
        shipping: res.data
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div>
        <span style={{ fontSize: "18px", color:"#4a4a4a" }}>
          Pengiriman dari : <b style={{ color: "#F63700" }}>China</b>
        </span>
        <Shippings shipping={this.state.shipping} />
      </div>
    );
  }
}

export default Shipping;
