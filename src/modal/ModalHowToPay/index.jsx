import React, { Component } from "react";
import { Modal, Button } from "antd";
import convertTimesTime from "../../library/convertTimestime";
import currencyRupiah from "../../library/currency";
import "./style.sass";

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
    const { endDatePay, indexes } = this.props;
    console.log("Ini Modal How To Pay", this.props.visible);

    return (
      <div>
        <Modal
          title="Cara Bayar"
          visible={this.props.visible}
          // onOk={ this.handleOk }
          onCancel={this.props.close}
          footer={
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>
          }
        >
          <div className="contentPrice">
            <b>Total Pembayaran</b>
            <p className="contentPrice__total">{currencyRupiah(indexes[0].totalAmount)}</p>
            <b>Bayar Sebelum</b>
            <p className="contentPrice__datePay">
              {convertTimesTime.millisecond(endDatePay)}
            </p>
          </div>
          <p>
            <img
              src={require("../../assets/img/ic_bni.png")}
              style={{
                height: 15.84,
                width: 49
              }}
              alt=""
            />
          </p>
          <p>Some contents...</p>
        </Modal>
      </div>
    );
  }
}

export default ModalHowToPay;
