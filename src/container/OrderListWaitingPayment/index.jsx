import React, { Component } from "react";
import dummyProductOrder from "../../dummy/dummyProductOrder";
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";

class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: [],
      indexes: [],
      isHowToShowModalOpen: false
    };
  }

  async componentDidMount() {
    this.productOrder();
  }

  toggleIsHowToShowModalOpen = () => {
    console.log("aku di klik", this.state.isHowToShowModalOpen);
    this.setState({ isHowToShowModalOpen: !this.state.isHowToShowModalOpen });
  };

  productOrder = async () => { 
    try {
      const res = await dummyProductOrder;
      const itemProductOrder = {
        productorder: res.data, 
      };
      this.setState({
        ...itemProductOrder
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    const { isHowToShowModalOpen } = this.state;
    const { toggleIsHowToShowModalOpen } = {
      toggleIsHowToShowModalOpen: this.toggleIsHowToShowModalOpen
    };
    console.log(this.state.productorder);
              
    return (
      <React.Fragment>
        {this.state.productorder.map((order) => {
          return (
            <div
              style={{
                backgroundColor: "#FFFFFF",
                marginTop: 10,
                borderRadius: 4,
                padding: 10
              }}
            >
              <ProductOrder
                indexes={order.indexes}
              />
              <WaitingPayment
                endDatePay={order.endDatePay}
                indexes={order.indexes}
                isHowToShowModalOpen={isHowToShowModalOpen}
                toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
