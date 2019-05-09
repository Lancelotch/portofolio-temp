import React, { Component } from "react";
import { Modal, Button, Row, Col, Collapse } from "antd";
import convertTimesTime from "../../library/convertTimestime";
import currencyRupiah from "../../library/currency";
import "./style.sass";
import strings from "../../localization/localization";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { caraBayarBankBni } from "../../library/dataBank";

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
    const { endDatePay, pay, payBank } = this.props;
    return (
      <div>
        <Modal
          title="Cara Bayar"
          visible={this.props.visible}
          // onOk={ this.handleOk }
          onCancel={this.props.close.bind(this, null)}
          footer={
            <Button key="submit" className="okCaraBayar" type="primary" onClick={this.handleOk}>
              Ok
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
          <p className="paymenttype">{pay.paymentType}</p>
          <div className="virtualAccontCopy"
            style={{
              height: 58.42,
              borderRadius: 4
            }}>
            <Row>
              <Col md={20}>
                <p style={{ textAlign: "center", fontSize: 24, color: "#004853" }}>
                  {pay.virtualAccount}
                </p> </Col>&nbsp;
              <Col md={4}>
                <CopyToClipboard
                  text={pay.virtualAccount}
                  onCopy={() => this.setState({ copied: true })}>
                  <span style={{
                    cursor: "pointer",
                    position: "relative",
                    bottom: 19
                  }} className="buttonModalVirtualAccount">Salin</span>
                </CopyToClipboard>
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
                  {caraBayarBankBni}
                </Panel>
              </Collapse>
            </Col>
          </Row>
        </Modal >
      </div >
    );
  }
}

export default ModalHowToPay;
