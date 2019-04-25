import React, { Component } from "react";
import OrderDetails from ".";

class OrderDetailsContainers extends Component {
  render() {
    const {
      warna,
      ukuran,
      variants,
      sku,
      quantity,
      totalPrice,
      name,
      shipping,
      onChangeQuantity,
      onChangeShipping
    } = this.props;
    return (
      <React.Fragment>
        {quantity > 0 && (
          <OrderDetails
            warna={warna}
            ukuran={ukuran}
            variants={variants}
            name={name}
            sku={sku}
            quantity={quantity}
            totalPrice={totalPrice}
            onChangeQuantity={onChangeQuantity}
            onChangeShipping={onChangeShipping}
            shipping={shipping}
          />
        )}
      </React.Fragment>
    );
  }
}

export default OrderDetailsContainers;
