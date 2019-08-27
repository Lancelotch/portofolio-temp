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

  componentDidMount() {
    this.shipping();
  }


  shipping = async () => {
    try {
      //const res = await shipping.getShipping();
      const res = await dummyShipping;
      console.log("res", res)
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
        <span style={{ fontSize: "18px", color: "#4a4a4a" }}>
          Pengiriman dari : <b style={{ color: "#F63700" }}>China</b>
        </span>
        <Shippings  totalShipping={this.props.totalShipping} shipping={this.state.shipping} />
      </div>
    );
  }
}

export default Shipping;
