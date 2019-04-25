import React, { Component } from "react";
import { Modal, Button } from "antd";
import convertTimesTime from "../../library/convertTimestime";
import currencyRupiah from "../../library/currency";
import "./style.sass";
import strings from "../../localization/localization";

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
    const { endDatePay, pay, payBank } = this.props;
    console.log("Ini Modal How To Pay", this.props);
    // console.log(payment.orderId);
    return (
      <div>
        <Modal
          title="Cara Bayar"
          visible={this.props.visible}
          // onOk={ this.handleOk }
          onCancel={this.props.close.bind(this, null)}
          footer={
            <Button key="submit" type="primary" onClick={this.handleOk}>
              Submit
            </Button>
          }
        >
          <div className="contentPrice">
            <b>{strings.total_payment}</b>
            <p className="contentPrice__total">
              {currencyRupiah(pay.grossAmount)}
            </p>
            <b>{strings.before_pay}</b>
            <p className="contentPrice__datePay">
              {convertTimesTime.millisecond(endDatePay)}
            </p>
          </div>
          <p>
            <img
              src={payBank.imageUrl}
              style={{
                height: 15.84,
                width: 49
              }}
              alt=""
            />
          </p>
          <p>{pay.paymentType}</p>
          <p>{pay.virtualAccount}</p>
        </Modal>
      </div>
    );
  }
}

export default ModalHowToPay;
