import React, { Component } from "react";
import dummyOrderDetailsDashboard from "../../dummy/dummyOrderDetailsDashboard";
import ProductOrder from "../../components/ProductOrderDetails";

class OrderDetailsDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: {},
      indexes: [],
      invoiceId: this.props.invoiceId
    };
  }

  componentDidMount() {
    this.productOrder();
  }

  productOrder = async () => {
    try {
      const res = await dummyOrderDetailsDashboard;
      const itemProductOrder = {
        productorder: res.data,
        indexes: res.data.indexes
      };
      this.setState({
        ...itemProductOrder
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <React.Fragment>
        {this.state.indexes.map(order => {
          return (
              <ProductOrder
                variants={order.variants}
                productName={order.productName}
                productQuantity={order.productQuantity}
                totalAmount={order.totalAmount}
              /> 
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderDetailsDashboard;
