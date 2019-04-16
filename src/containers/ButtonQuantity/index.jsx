import React, { Component } from "react";
import ButtonQuantity from "../../components/ButtonQuantity";

class ButtonQuantityContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stock: this.props.stock,  
      quantity: this.props.quantity,
      title: this.props.title,
      onChangeQuantity: this.props.quantity
    };
    console.log("ini quanttyyyyyyy", this.props);
  }

  incrementItem = () => {
    const quantity = this.state.quantity;
    this.setState({ quantity: quantity + 1 }, () => {
      this.props.onChange(this.state.quantity, true);
    });
    this.checkStock(quantity);
  };

  decrementItem = () => {
    const quantity = this.state.quantity;
    if (this.state.quantity > 1) {
      this.setState({ quantity: quantity - 1 }, () => {
        this.props.onChange(this.state.quantity, false);
      });
    }
    this.checkStock(quantity);
  };

  checkStock = quantity => {
      let stock = this.props.stock
      if ( stock < quantity) {
         alert('alert stock kurang cyiin') ;  
         this.setState({
             quantity : stock
         })
      } else if (quantity < 1) {
          alert('coba lagi')
      }
  }

  onChangeQuantity = event => {
    let quantity = this.state.quantity;
    isNaN(event.target.value) === true ||
    event.target.value === "0" ||
    event.target.value === ""
      ? (quantity = 1)
      : (quantity = parseInt(event.target.value));
    this.setState(
      {
        quantity: quantity
      },
      () => {
        this.props.onChange(this.state.quantity, true);
      }
    );
    this.checkStock(quantity);
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
