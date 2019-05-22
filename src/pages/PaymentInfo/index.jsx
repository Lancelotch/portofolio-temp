import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Button, Modal } from "antd";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import PaymentInstructions from "../../components/PaymentInstructions/index";
import PaymentInvoice from "../../components/PaymentInvoice/index";
import history from "../../routers/history";
import { apiGetWithToken } from "../../api/services";
import { PATH_ORDER } from "../../api/path";
import { Link } from "react-router-dom";

class PaymentInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paymentInstruction: {},
      payment: null,
      endDatePayment: null,
      bank: {},
      copied: false
    };
  }


  componentDidMount() {
    this.getPaymentInfo();
  }

  getPaymentInfo = async () => {
    const paymentId = this.props.match.params.paymentId;
    try {
      const response = await apiGetWithToken(PATH_ORDER.ORDER_PAYMENT_ID + paymentId)
      console.log('paymeeent info', response);
      const payment = response.data.data;
      this.setState({
        paymentInstruction: payment.paymentInstruction,
        endDatePayment: payment.endDatePayment,
        payment: payment.payment,
        bank: payment.bank

      });
    } catch (error) {
      console.log(error);
    }
  };

  onCopy = () => {
    this.setState({ copied: true });
  };

  actionToDashboardCustomer = () => {
    return history.push("/dashboard-customer");
  }

  render() {
    console.log(this.state.paymentInstruction);

    const { payment, endDatePayment, bank, paymentInstruction } = this.state;

    const warning = () => {
      Modal.warning({
        title: strings.payment_modal_ask,
        content: strings.payment_modal_content,
        onOk: this.actionToDashboardCustomer
      });
    };
    return (
      <div className="container">
        <div className="top-header">
          <span>{strings.payment_info_sentence}</span>
        </div>
        <div className="content">
          <div className="logo">
            <Link to="/#">
              <img src={monggopesen_logo} alt="" />
            </Link>
          </div>
          <div className="info__style">
            <div className="info__title">
              <p>{strings.payment_info}</p>
              <Divider />
            </div>
            <div className="info__content">
              {payment &&
                <PaymentInvoice
                  payment={payment}
                  endDatePay={endDatePayment}
                  bank={bank}
                  onCopy={this.onCopy}
                />
              }
              <div className="info__dropdownMethod">
                {paymentInstruction &&
                  <PaymentInstructions paymentInstruction={this.state.paymentInstruction} />
                }
              </div>
              <div>
                <Button className="info__button" onClick={warning}>
                  <p>{strings.payment_check}</p>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PaymentInfoPage;
