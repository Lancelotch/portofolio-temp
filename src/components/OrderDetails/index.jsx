import React, { Component } from "react";
import ButtonQuantity from "../ButtonQuantity";
import TextArea from "antd/lib/input/TextArea";
import { Table } from "antd";
import NotedLimit from "../NotedLimit";
import SelectShipping from "../SelectShipping";
import currencyRupiah from "../../library/currency";

class DetailPesanan extends Component {
  constructor(props){
    super(props)
    this.state = {
      quantity : 0
    }
  }
  onChangeQuantity = (quantity, operator) => {
    this.setState(
      {
        quantity: this.props.quantity
      }
      //   () => {
      //     this.props.onChangeProduct(this.state);
      //   }
    );
  };
  componentDidMount(){
    console.log('detail')
    this.setState({
      quantity: this.props.quantity
    })
  }

  render() {
    const {
      totalPrice,
      productId,
      sku,
      quantity,
      incrementQuantity,
      decrementQuantity,
      onChangeQuantity,
      name
    } = this.props;
    console.log('detail', this.state.quantity);

    return (
      <div>
        <p className="price">{currencyRupiah(totalPrice)}</p>

        <p>{productId}</p>
        <h2>{name}</h2>
        <p>{JSON.stringify(sku)}</p>
        <p>{quantity}</p>

        <ButtonQuantity quantity={this.state.quantity} onChange={onChangeQuantity} />
        <NotedLimit />
        <SelectShipping/>
      </div>
    );
  }
}

export default DetailPesanan;
