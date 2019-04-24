import React, { Component } from "react";
import ButtonQuantity from "../../components/ButtonQuantity";

class ButtonQuantityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quantity: this.props.quantity,
      title: this.props.title,
      onChangeQuantity: this.props.quantity
    };
  }

  incrementItem = () => {
    this.setState(prevState=>({
      quantity : prevState.quantity + 1
    }), () => {
      this.props.onChange(this.state.quantity, true);
    });
  };

  decrementItem = () => {
    if (this.state.quantity > 1) {
      this.setState(prevState=>({
        quantity : prevState.quantity - 1
      }), () => {
        this.props.onChange(this.state.quantity, false);
      });
    }
  };

  checkTypingQuantity = (event) => (
    isNaN(event.target.value) === true ||
    event.target.value === "0" ||
    event.target.value === ""
      ? 1
      : parseInt(event.target.value)
  )

  onChangeQuantity = event => {
    const quantity = this.checkTypingQuantity(event);
    this.setState({
      quantity: quantity
    },() => {
        this.props.onChange(this.state.quantity, true);
      }
    );
  };

  render() {
    return (
      <div>
        <ButtonQuantity
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
