import React, { Component } from "react";
import ButtonQuantity from "../../components/ButtonQuantity";
import { notification } from 'antd';
import strings from "../../localization/localization";


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
      this.props.onChange(this.state.quantity, true);
    });
    this.checkStockAvailability(this.props.stock);
  };

  decrementItem = () => {
    if (this.state.quantity > this.props.stock) {
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
    isNaN(event.target.value) === true ||
      event.target.value === "0" ||
      event.target.value === "" 
      ? 1 : parseInt(event.target.value)
  )

  onChangeQuantity = event => {
    if (this.state.quantity > this.props.stock) {
      this.setState({
        quantity: this.props.stock
      }, () => {
        this.props.onChange(this.state.quantity, true);
      });
    } else {
      const quantity = this.checkTypingQuantity(event);
      this.setState({
        quantity: quantity
      }, () => {
        this.props.onChange(this.state.quantity, true);
      });
    }
  };

  render() {
    const disable = this.state.quantity > this.props.stock ? true : false
    return (
      <div>
        <ButtonQuantity
          disable={disable}
          stock={this.props.stock}
          stockAlert={this.state.stockAlert}
          incrementItem={this.incrementItem}
          decrementItem={this.decrementItem}
          quantity={this.state.quantity}
          onChangeQuantity={this.onChangeQuantity}
        />
      </div>
    );
  }
}

export default ButtonQuantityContainer;
