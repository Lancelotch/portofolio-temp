import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import Pay from "../../components/ButtonDashboard/Pay"
import Cancel from "../../components/ButtonDashboard/Cancel"

class OrderListingCancel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: []
    };
  }



  render() {
    const { orderProduct} = this.props
    return (
      <React.Fragment>
        {orderProduct.map((order, i) => {
          return (
            <div className="waitingPayment__list" key={order.id}>
              <ProductOrder key={order.id} indexes={order.indexes} />
                <Cancel
                  productDetail={order.indexes}
                  viewOrderDetail={this.props.viewOrderDetail}
                />
              
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderListingCancel;
