import React, { Component } from "react";
import { Modal, Button } from "antd";
import convertTimesTime from "../../library/convertTimestime";
import currencyRupiah from "../../library/currency";

class ModalHowToPay extends Component {
  constructor(props) {
    super(props);
    console.log("", this.props.visible);

    this.state = {
      visible: this.props.visible
    };
  }

  handleOk = () => {
    console.log("pendcet");
    this.props.close();
  };

  render() {
    const { endDatePay, totalAmount } = this.props;
    console.log("Ini Modal How To Pay", this.props.visible);

    return (
      <div>
        <Modal
          title="Cara Bayar"
          visible={this.props.visible}
          // onOk={ this.handleOk }
          // onCancel={this.props.close}
          footer={
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>
          }
        >
          <b>Total Pembayaran</b>
          <p>{currencyRupiah(totalAmount)}</p>
          <b>Bayar Sebelum</b>
          <p>{convertTimesTime.millisecond(endDatePay)}</p>
          <p>Some contents...</p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default ModalHowToPay;
