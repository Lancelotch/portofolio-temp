import React, { Component } from "react";
import dummyProductOrder from "../../dummy/dummyProductOrder";
import ProductOrder from "../../components/ProductOrder";
import WaitingPayment from "../../components/WaitingPayment";
import ModalHowToPay from "../../modal/ModalHowToPay";
import { Button, Modal } from "antd";

const confirm = Modal.confirm;

function showDeleteConfirm() {
  confirm({
    icon: "close-circle",
    iconClassName: "iconWaitingPaymentCancel",
    title: "Anda yakin ingin membatalkan pesanan?",
    content: "Pesanan yang anda buat akan kami batalkan",
    okText: "Batalkan",
    okType: "danger",
    cancelText: "Kembali",
    onOk() {
      console.log("OK");
    },
    onCancel() {
      console.log("Cancel");
    }
  });
}

class OrderListWaitingPayment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productorder: [],
      indexes: [],
      isHowToShowModalOpen: false
    };
  }

  componentDidMount() {
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
        productorder: res.data
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
        {this.state.productorder.map(order => {
          console.log("ambil payment", order.payment);
          return (
            <div className="waitingPayment__list">
              <ProductOrder indexes={order.indexes} />
              <WaitingPayment
                endDatePay={order.endDatePay}
                indexes={order.indexes}
                pay={order.payment}
                isHowToShowModalOpen={isHowToShowModalOpen}
                toggleIsHowToShowModalOpen={toggleIsHowToShowModalOpen}
              />
              <Button
                className="waitingPayment__button"
                onClick={showDeleteConfirm}
              >
                Batalkan Pesanan
              </Button>
              <div style={{ float: "right", marginRight: 15 }}>
                <Button
                  className="waitingPayment__payNow"
                  onClick={toggleIsHowToShowModalOpen}
                >
                  Bayar Sekarang
                </Button>
                <Button
                  className="waitingPayment__detailPesanan"
                  onClick={() => this.props.viewOrderDetail()}
                >
                  Detail Pesanan
                </Button>
              </div>
              <ModalHowToPay
                key={order.orderId}
                endDatePay={order.endDatePay}
                pay={order.payment}
                indexes={order.indexes}
                visible={isHowToShowModalOpen}
                close={toggleIsHowToShowModalOpen}
              />
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

export default OrderListWaitingPayment;
