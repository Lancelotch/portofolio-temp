import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

const WaitingPayment = props => {
  const {
    indexes,
    orderId,
    labelNotPay,
    tabsNotPay,
    tabsInDelivery,
    tabsNotSent,
    tabsFinish,
    tabsCancel,
    labelNotSent,
    labelCancel,
    labelInDelivery,
    labelFinish
  } = props;
  return (
    <React.Fragment>
      <div className="waitingPayment" key={orderId}>
        <Row>
          {tabsNotPay === 1 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 16
                }}>
                {labelNotPay}
              </p>
              <p className="waitingPayment__endDatePay">
                {convertTimesTime.millisecond(indexes.payment.gateway.expiredPaymentDate)}
              </p>
            </Col>
          }
          {tabsNotSent === 2 &&
            <Col md={12}>
              <p
                className="dalamProsesPengiriman">
                {labelNotSent}
              </p>
            </Col>
          }
          {tabsInDelivery === 3 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 16
                }}>
                {labelInDelivery}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16
              }}>
                {convertTimesTime.millisecond(indexes.orderActivityDate.receivedDate)}
              </p>
            </Col>
          }
          {tabsFinish === 4 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  fontSize: 16
                }}>
                {labelFinish}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16
              }}>
                {convertTimesTime.millisecond(indexes.orderActivityDate.receivedDate)}
              </p>
            </Col>
          }
          {tabsCancel === 5 &&
            <Col md={12}>
              <p
                style={{
                  marginBottom: 0,
                  color: "black"
                }}>
                {labelCancel} {"Admin"}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16
              }}>
                {convertTimesTime.millisecond(indexes.orderDraftCancel && indexes.orderDraftCancel.createdDate)}
              </p>
            </Col>
          }
          <Col md={12}>
            <font className="waitingPayment__totalReceived"
              style={{ color: "#777777" }}>
              Total Pesenan : &nbsp;
            <h4 style={{
                display: "unset",
                fontSize: 28,
                color: "#4A4A4A"
              }}>
                {currencyRupiah(indexes.amount)}
              </h4>
            </font>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default WaitingPayment;
