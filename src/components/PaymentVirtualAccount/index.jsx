import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import strings from "../../localization/localization";
import ic_bni from "../../assets/img/ic_bni.png";
import { Row, Col, Button, message } from "antd";
import currencyRupiah from "../../library/currency";
import convertTimestime from "../../library/convertTimestime";

const PaymentInvoice = props => {
  const { grossAmount, endDatePay, virtualAccount, onCopy } = props;
  const success = () => {
    message.success("Copied", 0.5);
  };
  return (
    <React.Fragment>
      <Row className="info__payment">
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_total_amount}
          </p>
          <p style={{ color: "#004853", fontSize: "36px" }}>
            {currencyRupiah(grossAmount)}
          </p>
          <br />
        </Col>
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_pay_before}
          </p>
          <p style={{ color: "#4A4A4A", fontSize: "24px" }}>
            {convertTimestime.millisecond(endDatePay)}
          </p>
        </Col>
      </Row>
      <Row type="flex" align="middle" className="info__bank">
        <Col md={4}>
          <img src={ic_bni} alt="" className="info__bni" />
          <br />
          <text style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.virtual_account}
          </text>
        </Col>
        <Col md={16} style={{ textAlign: "center" }}>
          <text className="virtualNumber">{virtualAccount}</text>
        </Col>
        <Col md={4} style={{ textAlign: "end" }}>
          <CopyToClipboard text={virtualAccount} onCopy={onCopy}>
            <Button onClick={success} className="info__bankButton">
              <p>Salin</p>
            </Button>
          </CopyToClipboard>
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaymentInvoice;
