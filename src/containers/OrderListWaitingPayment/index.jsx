import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import Pay from "../../components/ButtonDashboard/Pay"
import Cancel from "../../components/ButtonDashboard/Cancel"
import strings from "../../localization/localization";
import NoOrderHistory from "../../components/NoOrderHistory";


class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexes: [],
      isHowToShowModalOpen: false,
      selectedOrder: null
    };
  }

  toggleIsHowToShowModalOpen = order => {
    this.setState({
      isHowToShowModalOpen: !this.state.isHowToShowModalOpen,
      selectedOrder: order ? order : null
    });
  };


  render() {
    const { orderProduct, showDeleteConfirm, index } = this.props
    const { isHowToShowModalOpen, selectedOrder } = this.state;
    const { toggleIsHowToShowModalOpen } =
      { toggleIsHowToShowModalOpen: this.toggleIsHowToShowModalOpen };
    return (
      <React.Fragment>
        {orderProduct ?
          (<React.Fragment>
            {orderProduct.map((order, i) => {
              return (
                <div className="waitingPayment__list" key={i}>
                  <ProductOrder
                    key={order.id}
                    indexes={order.indexes} />
                  {index === 1 &&
                    <React.Fragment>
                      <WaitingPayment
                        label={strings.before_pay}
                        index={1}
                        key={order.id}
                        endDatePay={order.endDatePay}
                        indexes={order.indexes}
                        pay={order.payment}
                        isHowToShowModalOpen={isHowToShowModalOpen}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                      />
                      <Pay
                        productId={order.indexes}
                        index={1}
                        showDeleteConfirm={showDeleteConfirm}
                        orderProduct={orderProduct}
                        i={i}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                        order={order}
                        showOrderDetailsDashboard={() => this.props.showOrderDetailsDashboard(order)}
                      />
                    </React.Fragment>}
                  {index === 2 &&
                    <React.Fragment>
                      <WaitingPayment
                        indexDalamPengiriman={2}
                        index={2}
                        labelPengiriman="Dalam Proses Pengiriman"
                        key={order.id}
                        endDatePay={order.endDatePay}
                        indexes={order.indexes}
                        pay={order.payment}
                        isHowToShowModalOpen={isHowToShowModalOpen}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                      />
                      <Pay
                        indexes={order.indexes}
                        indexButton={2}
                        showDeleteConfirm={showDeleteConfirm}
                        orderProduct={orderProduct}
                        i={i}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                        order={order}
                        showOrderDetailsDashboard={() => this.props.showOrderDetailsDashboard(order.orderId)}
                      />
                    </React.Fragment>
                  }
                  {index === 3 &&
                    <React.Fragment>
                      <WaitingPayment
                        indexDalamPengiriman={3}
                        labelPengiriman="Perkiraan Barang Diterima"
                        index={3}
                        key={order.id}
                        estimateShippingDate={order.estimateShippingDate}
                        endDatePay={order.endDatePay}
                        indexes={order.indexes}
                        pay={order.payment}
                        isHowToShowModalOpen={isHowToShowModalOpen}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                      />
                      <Pay
                        indexes={order.indexes}
                        indexButton={3}
                        showDeleteConfirm={showDeleteConfirm}
                        orderProduct={orderProduct}
                        i={i}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                        order={order}
                        showOrderDetailsDashboard={this.props.showOrderDetailsDashboard}
                      />
                    </React.Fragment>
                  }
                  {index === 4 &&
                    <React.Fragment>
                      <WaitingPayment
                        indexDalamPengiriman={4}
                        label="Pesanan Diterima"
                        index={4}
                        key={order.id}
                        estimateShippingDate={order.estimateShippingDate}
                        endDatePay={order.receivedDate}
                        indexes={order.indexes}
                        pay={order.payment}
                        isHowToShowModalOpen={isHowToShowModalOpen}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                      />
                      <Pay
                        indexButton={4}
                        indexes={order.indexes}
                        showDeleteConfirm={showDeleteConfirm}
                        orderProduct={orderProduct}
                        i={i}
                        toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                        order={order}
                        showOrderDetailsDashboard={this.props.showOrderDetailsDashboard}
                      />
                    </React.Fragment>
                  }
                  {index === 5 &&
                    <React.Fragment>     
                    <Cancel
                      indexes={order.indexes}
                      showOrderDetailsDashboard={this.props.showOrderDetailsDashboard}
                    />
                    </React.Fragment>
                  }

                </div>
              );
            })}
            {selectedOrder && (
              <ModalHowToPay
                payBank={selectedOrder.bank}
                key={selectedOrder.orderId}
                endDatePay={selectedOrder.endDatePay}
                pay={selectedOrder.payment}
                indexes={selectedOrder.indexes}
                visible={isHowToShowModalOpen}
                close={toggleIsHowToShowModalOpen}
              />
            )}
          </React.Fragment>)
          :
          (<NoOrderHistory />)}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
