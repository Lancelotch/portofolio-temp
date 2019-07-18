import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import strings from "../../localization/localization";
import { Row, Col, Button } from "antd";
import currencyRupiah from "../../library/currency";
import convertTimesTime from "../../library/convertTimestime";

const PaymentInvoice = props => {
  const { gateway, onCopy } = props;
  return (
    <React.Fragment>
      <Row className="info__payment">
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_total_amount}
          </p>
          <p style={{ color: "#004853", fontSize: "36px" }}>
            {currencyRupiah(gateway.grossAmount)}
          </p>
          <br />
        </Col>
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_pay_before}
          </p>
          <p style={{ color: "#4A4A4A", fontSize: "24px" }}>
            {convertTimesTime.millisecond(gateway.expiredPaymentDate)}
          </p>
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "center", marginTop: 35 }}>
        <p style={{ color: "black", fontSize: 25, fontWeight: 500 }}>
          {strings.virtual_account}
        </p>
      </div>
      <Row type="flex" align="middle" className="info__bank">
        <Col md={4}>
          <img src={gateway.bank && gateway.bank.imageUrl} alt="" style={{ maxWidth: 250, maxHeight: 50 }} />
        </Col>
        <Col md={16} style={{ textAlign: "center" }}>
          <span className="virtualNumber">{gateway.virtualAccount}</span>
        </Col>
        <Col md={4} style={{ textAlign: "end" }}>
          <CopyToClipboard text={gateway.virtualAccount} onCopy={onCopy}>
            <Button className="info__bankButton">
              <p>{strings.copy}</p>
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaymentInvoice;
