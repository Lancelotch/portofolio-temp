import React, { Component } from "react";
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import "../../components/ProductOrder/style.sass";
import Pay from "../../components/ButtonWaitingPayment/Pay"
import Cancel from "../../components/ButtonWaitingPayment/Cancel"

class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: [],
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
    const { toggleIsHowToShowModalOpen } = {
      toggleIsHowToShowModalOpen: this.toggleIsHowToShowModalOpen
    };
    return (
      <React.Fragment>
        {orderProduct.map((order, i) => {
          return (
            <div className="waitingPayment__list" key={order.id}>
              <ProductOrder key={order.id} indexes={order.indexes} />
              {index === 1 &&
                <WaitingPayment
                  label="Bayar Sebelum"
                  index={1}
                  key={order.id}
                  endDatePay={order.endDatePay}
                  indexes={order.indexes}
                  pay={order.payment}
                  isHowToShowModalOpen={isHowToShowModalOpen}
                  toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                />}
              {index === 1 &&
                <Pay
                  productDetail={order.indexes}
                  index={1}
                  showDeleteConfirm={showDeleteConfirm}
                  orderProduct={orderProduct}
                  i={i}
                  toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                  order={order}
                  viewOrderDetail={this.props.viewOrderDetail}
                />
              }
              {index === 2 &&
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
                />}
              {index === 2 &&
                <Pay
                  productDetail={order.indexes}
                  indexButton={2}
                  showDeleteConfirm={showDeleteConfirm}
                  orderProduct={orderProduct}
                  i={i}
                  toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                  order={order}
                  viewOrderDetail={this.props.viewOrderDetail}
                />}
              {index === 3 &&
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
                />}
              {index === 3 &&
                <Pay
                  productDetail={order.indexes}
                  indexButton={3}
                  showDeleteConfirm={showDeleteConfirm}
                  orderProduct={orderProduct}
                  i={i}
                  toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                  order={order}
                  viewOrderDetail={this.props.viewOrderDetail}
                />
              }
              {index === 4 &&
                <WaitingPayment
                  indexDalamPengiriman={4}
                  label="Pesanan Diterima"
                  index={4}
                  key={order.id}
                  estimateShippingDate={order.estimateShippingDate}
                  endDatePay={order.endDatePay}
                  indexes={order.indexes}
                  pay={order.payment}
                  isHowToShowModalOpen={isHowToShowModalOpen}
                  toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                />}
              {index === 4 &&
                <Pay
                  indexButton={4}
                  productDetail={order.indexes}
                  showDeleteConfirm={showDeleteConfirm}
                  orderProduct={orderProduct}
                  i={i}
                  toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
                  order={order}
                  viewOrderDetail={this.props.viewOrderDetail}
                />
              }
              {index === 5 &&
                <Cancel
                  productDetail={order.indexes}
                  viewOrderDetail={this.props.viewOrderDetail}
                />
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
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
