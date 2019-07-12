import React, { Component } from "react";
import "../../components/ButtonQuantity/style.sass";
import {  Input, Icon } from 'antd';
import { Typography } from 'antd';

const { Text } = Typography;

class ButtonQuantityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.title,
      text: ""
    };
  }

  incrementItem = () => {

    if (this.props.quantity > this.props.stock) {
      this.setState({
        text: "Sudah Mencapai Jumlah Maksimum"
      })
    } else {
      this.props.actionUpdateQuantity(this.props.quantity + 1)
    }
  };

  decrementItem = () => {
    this.props.actionUpdateQuantity(this.props.quantity - 1)
  };

  checkTypingQuantity = (event) => (
    isNaN(event.target.value) === true
      || event.target.value === "0"
      || event.target.value === ""
      ? 1 : parseInt(event.target.value)
  );

  // onChangeQuantity = event => {
  //   const quantity = this.state.quantity
  //   console.log("event",event.target.value)
  //   let checkCount = 0
  //   if (this.state.quantity > this.props.stock) {
  //     // console.log("===",quantity,"===",this.props.stock)
  //     checkCount = this.props.stock
  //   } else {
  //     // console.log("else",quantity,"==",this.props.stock)
  //     checkCount = quantity
  //   }
  //   this.setState({
  //     quantity : checkCount
  //   })
  // };

  onChangeQuantityBlur = event => {
    if (event.target.value < 1) {
      this.props.actionUpdateQuantity(1);
    }
  }

  onChangeQuantity = event => {
    let stock = this.props.stock
    let checkCount = 1
    if (event.target.value > stock) {
      this.setState({
        text: "Sudah Mencapai Jumlah Maksimum, Stock hanya"  + stock
      })
      checkCount = stock
      this.props.actionUpdateQuantity(event.target.value)
      setTimeout(() => {
        this.props.actionUpdateQuantity(stock)
      }, 300)
      setTimeout(() => { this.setState({
        text: ""
      })},3000)
    } else {
      checkCount = event.target.value
      this.props.actionUpdateQuantity(checkCount)
    }
  };



  render() {
    const Buttondisabled = this.props.quantity >= this.props.stock ? true : false
    const disabled = this.props.quantity <= 1 ? true : false;
    console.log("ini props", this.props)
    return (
      <React.Fragment>
        <div className="row-quantity">
          <div>
            <button
              className="button_quantity"
              onClick={this.decrementItem}
              disabled={disabled}
            >
              <Icon className="icon__quantity" type="minus" />
            </button>
          </div>
          <div className="input-quantity">
            <Input
              //maxLength={4}
              // defaultValue={1}
              min={1}
              max={10}
              type="number"
              value={this.props.quantity}
              onChange={(e) => this.onChangeQuantity(e)}
              onBlur={(e) => this.onChangeQuantityBlur(e)}
            />
          </div>
          <div>
            <button className="button_quantity" onClick={this.incrementItem} disabled={Buttondisabled}>
              <Icon className="icon__quantity" type="plus" />
            </button>
          </div>
          <Text style={{ marginTop: "3 %" }} type="danger">{this.state.text}</Text>
        </div>
      </React.Fragment>
    );
  }
}

export default ButtonQuantityContainer;
