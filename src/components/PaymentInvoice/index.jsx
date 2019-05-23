import React from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import strings from "../../localization/localization";
import { Row, Col, Button } from "antd";
import currencyRupiah from "../../library/currency";
import convertTimesTime from "../../library/convertTimestime";

const PaymentInvoice = props => {
  const { payment, endDatePay, onCopy, bank } = props;
  console.log(payment.paymentType);

  const success = () => {
    // message.success("Copied", 1);
  };
  return (
    <React.Fragment>
      <Row className="info__payment">
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_total_amount}
          </p>
          <p style={{ color: "#004853", fontSize: "36px" }}>
            {currencyRupiah(payment.grossAmount)}
          </p>
          <br />
        </Col>
        <Col md={24}>
          <p style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.payment_pay_before}
          </p>
          <p style={{ color: "#4A4A4A", fontSize: "24px" }}>
            {convertTimesTime.second(endDatePay)}
          </p>
        </Col>
      </Row>
      <Row type="flex" align="middle" className="info__bank">
        <Col md={4}>
          <img src={bank.imageUrl} alt="" style={{ maxWidth: 250, maxHeight: 50 }} />
          <br />
          <span style={{ color: "#9B9B9B", fontSize: "18px" }}>
            {strings.virtual_account}
          </span>
        </Col>
        <Col md={16} style={{ textAlign: "center" }}>
          <span className="virtualNumber">{payment.virtualAccount}</span>
        </Col>
        <Col md={4} style={{ textAlign: "end" }}>
          <CopyToClipboard text={payment.virtualAccount} onCopy={onCopy}>
            <Button onClick={success} className="info__bankButton">
              <p>{strings.copy}</p>
            </Button>
          </CopyToClipboard>
          
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default PaymentInvoice;
