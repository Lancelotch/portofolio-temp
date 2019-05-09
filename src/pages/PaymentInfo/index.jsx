import React, { Component } from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Divider, Button, Modal } from "antd";
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import PaymentInstructions from "../../components/PaymentInstructions/index";
import PaymentInvoice from "../../components/PaymentInvoice/index";
import dummyInvoiceInstructions from "../../dummy/dummyInvoiceInstructions";
import dummyInvoice from "../../dummy/dummyInvoice";

class PaymentInfoPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: dummyInvoiceInstructions.instructions,
      grossAmount: dummyInvoice.data[0].payment.grossAmount,
      endDatePay: dummyInvoice.data[0].endDatePay,
      virtualAccount: dummyInvoice.data[0].payment.virtualAccount,
      imageBank: dummyInvoice.data[0].bank.imageUrl,
      copied: false
    };
  }
  onCopy = () => {
    this.setState({ copied: true });
  };

  render() {
    const { grossAmount, endDatePay, virtualAccount, imageBank } = this.state;
    const instruction = this.state.instructions.map(instruct => {
      return <li>{instruct}</li>;
    });
    const warning = () => {
      Modal.warning({
        title: "Sudah selesai bayar?",
        content:
          "Pembayaran akan terverifikasi secara otomatis dalam 10 menit setelah anda berhasil transfer",
        okText: <a href="/customer-navigation">OK</a>
      });
    };
    return (
      <div className="container">
        <div className="top-header">
          <span>
            Gratis Ongkir Hingga Rp. 30,000 Dengan Belanja Minimum Rp. 200,000
          </span>
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
              />
              <div className="info__dropdownMethod">
                <PaymentInstructions instruction={instruction} />
              </div>
              <div>
                <Button className="info__button" onClick={warning}>
                  <p>Cek Status Pembayaran</p>
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
