import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col, Icon } from "antd";
import currencyRupiah from "../../library/currency";
import { Modal, Button } from "antd";
import ModalHowToPay from "../../modal/ModalHowToPay";

const confirm = Modal.confirm;

function showDeleteConfirm() {
  confirm({
    icon:"close-circle",
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

const WaitingPayment = props => {
  const { endDatePay, totalAmount } = props;
  console.log("======> props", props);
  return (
    <React.Fragment>
      <div className="waitingPayment">
        <b>Bayar Sebelum</b>
        <Row>
          <Col md={12}>
            <p className="waitingPayment__endDatePay">
              {convertTimesTime.millisecond(endDatePay)}
            </p>
            <Button className="waitingPayment__button" onClick={showDeleteConfirm}>Batalkan Pesanan</Button>
          </Col>
          <Col md={12}>
            <p className="waitingPayment__totalReceived">
              Total Pesenan :{" "}
              <h4 style={{ display: "unset", fontSize: 20 }}>
                {currencyRupiah(totalAmount)}
              </h4>
            </p>
            <Button className="waitingPayment__payNow" onClick={props.toggleIsHowToShowModalOpen}>
              Bayar Sekarang
            </Button>
          </Col>
        </Row>
      </div>
      <ModalHowToPay
      endDatePay={endDatePay}
        totalAmount={totalAmount}
        visible={props.isHowToShowModalOpen}
        close={props.toggleIsHowToShowModalOpen}
      />
    </React.Fragment>
  );
};

export default WaitingPayment;
