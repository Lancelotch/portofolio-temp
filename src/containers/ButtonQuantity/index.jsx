import React, { Component } from "react";
import "../../components/ButtonQuantity/style.sass";
import { notification, Input, Icon } from 'antd';
import strings from "../../localization/localization";
import { Typography } from 'antd';

const { Text } = Typography;

const categoryTextResult = (stock) => strings.formatString(
  strings.product_detail_info_stock,
  <b style={{ color: "#FF416C" }}> &nbsp;{stock}</b>
);

class ButtonQuantityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity,
      title: this.props.title,
      text: ""
    };
  }

  checkStockAvailability = (stock) => {
    if (this.state.quantity === this.props.stock) {
      let notif = notification["info"]({
        message: categoryTextResult(this.props.stock),
        description:
          "This is the content of the notification. This is the content of the notification. This is the content of the notification."
      });
      this.setState(prevState => ({
        quantity: stock,
        text: notif
      })
      )
    }
  }

  incrementItem = () => {
    this.setState(prevState => ({
      quantity: prevState.quantity + 1
    }), () => {
      this.props.onChange(this.state.quantity, true)
      this.checkStockAvailability(this.props.stock);
    });

  };

  decrementItem = () => {
    if (this.props.quantity > this.props.stock) {
      this.setState(prevState => ({
        quantity: this.props.stock
      }), () => {
        this.props.onChange(this.state.quantity, false);
      });
    }
    else {
      this.setState(prevState => ({
        quantity: prevState.quantity - 1
      }), () => {
        this.props.onChange(this.state.quantity, false);
      });
    }
    // if (this.state.quantity > 1) {
    //   this.setState(prevState => ({
    //     quantity: prevState.quantity - 1
    //   }), () => {
    //     this.props.onChange(this.state.quantity, false);
    //   });
    //   this.checkStockAvailability(this.props.stock);
    // }
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
              onClick={this.props.decrementItem}
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
              onChange={(e) => this.props.onChangeQuantity(e)}
            />
          </div>
          <div>
            <button className="button_quantity" onClick={this.props.incrementItem} disabled={Buttondisabled}>
              <Icon className="icon__quantity" type="plus" />
            </button>
          </div>
          <Text style={{ marginTop: "3 %"}} type="danger">{this.props.infoQuantity}</Text>
        </div>
      </React.Fragment>
    );
  }
}

export default ButtonQuantityContainer;
