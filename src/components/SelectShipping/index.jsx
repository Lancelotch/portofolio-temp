import React, { Component } from "react";
import Shippings from "./SelectShipping";
import shipping from "../../api/services/shipping";
import dummyShipping from "../../dummy/dummyShipping";

class SelectShipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: [],
      selected: [],
      shippingSelected: null
    };
  }

  async componentDidMount() {
    this.shipping();

    console.log("selected shipping", this.state)
  }

  onChangeShipping = selected => {
    this.props.onChangeShipping(selected)
    this.setState({
        shippingSelected: selected.id
      })
  };

  shipping = async () => {
    try {
      const res = await shipping.getShipping();
      // const res = await dummyShipping;
      this.setState({
        shipping: res.data,
        shippingSelected: res.data[1].id 
      });

      if( this.state.shippingSelected !== null){
        console.log('masuk if', res.data[1])
        this.props.onChangeShipping(res.data[1])
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
        <Shippings
          onChangeSelected={this.onChangeShipping}
          shipping={this.state.shipping}
          selected={this.state.shippingSelected}
        />
    );
  }
}

export default SelectShipping;
