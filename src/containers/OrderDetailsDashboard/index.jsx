import React, { Component } from "react";
import dummyOrderDetailsDashboard from "../../dummy/dummyOrderDetailsDashboard";
import ProductOrder from "../../components/ProductOrderDetails";
import PaymentInfo from "../../components/PaymentInfo";

class OrderDetailsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: {},
      payment: {},
      shipping: {},
      indexes: [],
      invoiceId: this.props.invoiceId
    };
  }

  componentDidMount() {
    this.productOrder();
  }

  productOrder = async () => {
    try {
      const response = await dummyOrderDetailsDashboard;
      const itemProductOrder = {
        shipping: response.data.shipping,
        payment: response.data.payment,
        productorder: response.data,
        indexes: response.data.indexes
      };
      this.setState({
        ...itemProductOrder
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log('viaaaaaaaaas', this.state.shipping);
    return (
      <React.Fragment>
        {this.state.indexes.map(order => {
          return (
            <React.Fragment>
              <ProductOrder
                key={order.id}
                productImage={order.productImage}
                variants={order.variants}
                productName={order.productName}
                productQuantity={order.productQuantity}
                totalAmount={order.totalAmount}
              />
              <PaymentInfo
                key={order.id}
                productName={order.productName}
                totalAmount={order.totalAmount}
                transport={this.state.shipping}
                price={order.price}
                productQuantity={order.productQuantity}
                typePayment={this.state.payment}
              />
            </React.Fragment>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderDetailsDashboard;
