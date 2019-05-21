import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Button, Modal } from "antd";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import PaymentInstructions from "../../components/PaymentInstructions/index";
import PaymentInvoice from "../../components/PaymentInvoice/index";
import dummyInvoice from "../../dummy/dummyInvoice";
import history from "../../routers/history";

class PaymentInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: dummyInvoice.paymentInstruction.instructions,
      grossAmount: dummyInvoice.payment.grossAmount,
      endDatePay: dummyInvoice.endDatePayment,
      virtualAccount: dummyInvoice.payment.virtualAccount,
      imageBank: dummyInvoice.bank.imageUrl,
      copied: false,
      messageCopy: ""
    };
  }
  onCopy = () => {
    this.setState({ 
      // copied: true,
      messageCopy: "Berhasil di Copy"
    });
    setTimeout(() =>{
      this.setState({
        messageCopy: ""
      })
    },6000)
  };

  actionToDashboardCustomer = () => {
   return history.push("/dashboard-customer");
  }

  render() {
    const { grossAmount, endDatePay, virtualAccount, imageBank } = this.state;
    const instruction = this.state.instructions.map(list => {
      return <li>{list}</li>;
    });
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
            <a href="/#">
              <img src={monggopesen_logo} alt="" />
            </a>
          </div>
          <div className="info__style">
            <div className="info__title">
              <p>{strings.payment_info}</p>
              <Divider />
            </div>
            <div className="info__content">
              <PaymentInvoice
                grossAmount={grossAmount}
                endDatePay={endDatePay}
                virtualAccount={virtualAccount}
                imageBank={imageBank}
                onCopy={this.onCopy}
                messageCopy={this.state.messageCopy}
              />
              <p style={{ textAlign: "center" }}>{this.state.messageCopy ? <span style={{ color: 'red' }}>Berhasil di Copy.</span> : ""}</p>
              <div className="info__dropdownMethod">
                <PaymentInstructions instruction={instruction} />
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
