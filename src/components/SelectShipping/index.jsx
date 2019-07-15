import React, { Component } from "react";
import { ShippingSelected } from "./ShippingSelected";

class SelectShipping extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shipping: [
        {
          "id": 1,
          "estimation": "Via Laut 21 - 30 hari",
          "shipment": "sea"
        },
        {
          "id": 2,
          "estimation": "Via Udara 7 - 11 hari",
          "shipment": "air"
        }
      ],
      selected: [],
      shippingSelectedId: 1
    };
  }

  onChangeShipping = (selected) => {
    this.setState({ shippingSelectedId: selected.id },
      this.props.onChangeShipping(selected)
    );
  };

  render() {
    console.log('qwwwqwqwqwqwq',this.props.totalShipping);
    
    return (
      <ShippingSelected
        shipmentFee={this.props.shipmentFee}
        onChangeSelected={this.onChangeShipping}
        shipping={this.state.shipping}
        selected={this.state.shippingSelectedId}
      />
    );
  }
}

export default SelectShipping;
