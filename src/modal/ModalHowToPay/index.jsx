import React, { Component } from "react";
import { Modal, Button, Row, Col, Collapse } from "antd";
import convertTimesTime from "../../library/convertTimestime";
import currencyRupiah from "../../library/currency";
import "./style.sass";
import strings from "../../localization/localization";
import { CopyToClipboard } from 'react-copy-to-clipboard';


class ModalHowToPay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      copied: false
    };
  };

  handleOk = () => {
    this.props.close();
  };

  callback = (key) => {
    console.log(key);
  }

  render() {
    const Panel = Collapse.Panel;
    const { orderPayment } = this.props;
    console.log(orderPayment.gateway.bank);

    const instructions = orderPayment.gateway.bank.paymentInstructions
    console.log(instructions);

    const styleButtonCopy = {
      cursor: "pointer",
      position: "absolute",
      bottom: 19,
      right: 10,
      top: 2,
    }
    return (
      <div className="modalHowToPay" >
        {orderPayment !== undefined && orderPayment &&
          <Modal
            title="Cara Bayar"
            wrapClassName="modalHowToPay"
            visible={this.props.visible}
            centered={true}
            // onOk={ this.handleOk }
            onCancel={this.props.close.bind(this, null)}
            footer={
              <Button key="submit" className="okCaraBayar" type="primary" style={{ borderColor: "unset" }} onClick={this.handleOk}>
                Ok
            </Button>
            }
          >
            <div className="contentPrice">
              <b>{strings.total_payment}</b>
              <p className="contentPrice__total">
                {currencyRupiah(orderPayment.gateway.grossAmount)}
              </p>
              <b>{strings.before_pay}</b>
              <p className="contentPrice__datePay">
                {convertTimesTime.millisecond(orderPayment.gateway.expiredPaymentDate)}
              </p>
            </div>
            <p>
              <img
                src={orderPayment.gateway.bank.imageUrl}
                style={{
                  maxHeight: 68.84,
                  maxWidth: 68.84
                }}
                alt=""
              />
            </p>
            <p className="paymenttype">{/*{pay.bankName}*/}Virtual Account</p>
            <div className="virtualAccontCopy"
              style={{
                height: 58.42,
                borderRadius: 4
              }}>
              <Row>
                <Col md={24}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p className="virtualAccountType">
                      {orderPayment.gateway.virtualAccount}
                    </p>&nbsp;
                  <CopyToClipboard
                      text={orderPayment.gateway.virtualAccount}
                      onCopy={() => this.setState({ copied: true })}>
                      <p className="buttonModalVirtualAccount" style={styleButtonCopy}>Salin</p>
                    </CopyToClipboard>
                  </div>
                </Col>
                <Col md={24}>
                  <p style={{ textAlign: "center" }}>{this.state.copied ? <span style={{ color: 'red' }}>Berhasil di Copy.</span> : null}</p>
                </Col>
              </Row>
            </div>
            <Row>
              <Col md={24}>
                <Collapse defaultActiveKey={['1']} onChange={this.callback}>
                  <Panel header="Cara Bayar" key="1">
                    {instructions.map((ins, i) => {
                      return <div dangerouslySetInnerHTML={{ __html: ins.instruction }} />
                    })
                    }
                  </Panel>
                </Collapse>
              </Col>
            </Row>
          </Modal >
        }
      </div>
    );
  }
}

export default ModalHowToPay;
