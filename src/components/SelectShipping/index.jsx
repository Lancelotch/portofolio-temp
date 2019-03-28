import React, { Component } from "react";
import Shippings from "./SelectShipping";
import dummyShipping from "../../dummy/dummyShipping";
import shipping from "../../api/services/shipping";

class SelectShipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: [],
      selected: [],
      shippingSelected: []
    };
  }

  async componentDidMount() {
    this.shipping();
  }

  onChangeShipping = selected => {
    this.setState(
      {
        shippingSelected: selected
      }
    );
  };

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
      <div style={{ marginTop: 22 }}>
        <Shippings
         onChangeSelected={this.onChangeShipping}
          shipping={this.state.shipping}
          selected={this.state.selected}
        />
      </div>
    );
  }
}

export default SelectShipping;
