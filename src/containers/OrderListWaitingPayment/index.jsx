import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import DashboardOrder from "../DashboardOrder";
import "../../components/ProductOrder/style.sass";
import Pay from "../../components/ButtonDashboard/Pay"
import Cancel from "../../components/ButtonDashboard/Cancel"
import strings from "../../localization/localization";
import NoOrderHistory from "../../components/NoOrderHistory";
import OrderDetailsDashboard from "..//OrderDetailsDashboard";


class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      isHowToShowModalOpen: false,
      selectedOrder: null
    };
  }

  // actionShowOrderListWaitingPayment = () => {
  //   this.setState({
  //     isShowOrderDetailsDashboard: !this.state.isShowOrderDetailsDashboard
  //   });
  // };

  // actionShowOrderDetailsDashboard = (order) => {
  //   this.actionShowOrderListWaitingPayment();
  //   this.setState({
  //     orderDetailsId: order
  //   });
  //   console.log(order);

  // };

  toggleIsHowToShowModalOpen = order => {
    this.setState({
      isHowToShowModalOpen: !this.state.isHowToShowModalOpen,
      selectedOrder: order ? order : null
    });
  };


  render() {
    const {
      orderProduct,
      showDeleteConfirm,
      tabsCancel,
      tabsFinish,
      tabsNotPay,
      tabsInDelivery,
      labelTabDetails,
      tabsNotSent } = this.props
    const { toggleIsHowToShowModalOpen } =
      { toggleIsHowToShowModalOpen: this.toggleIsHowToShowModalOpen };
    return (  
      <React.Fragment>
        {orderProduct ?
          (<React.Fragment>
            {orderProduct.map((order, i) => {
              return (
                <div className="waitingPayment__list" key={i}>
                  <DashboardOrder
                    showOrderDetailsDashboard={() => this.props.showOrderDetailsDashboard()}
                    // isShowOrderDetailsDashboard={isShowOrderDetailsDashboard}
                    labelTabDetails={labelTabDetails}
                    showDeleteConfirm={showDeleteConfirm}
                    order={order}
                    toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                    tabsNotPay={tabsNotPay}
                    tabsInDelivery={tabsInDelivery}
                    tabsNotSent={tabsNotSent}
                    tabsFinish={tabsFinish}
                    tabsCancel={tabsCancel}
                    orderProduct={orderProduct} />
                </div>
              )
            })}
          </React.Fragment>)
          :
          (<NoOrderHistory/>)
        }
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
