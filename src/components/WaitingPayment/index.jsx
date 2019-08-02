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
    tabsShowItem,
    labelNotSent,
    labelCancel,
    labelInDelivery,
    labelFinish
  } = props;
  return (
    <React.Fragment>
      <div className="waiting-payment" key={orderId}>
        <Row>
          <Col md={12}>
            {tabsShowItem === 1 &&
              <React.Fragment>
                <p className="label-text">
                  {labelNotPay}
                </p>
                <p className="waiting-payment__end-date-pay">
                  {convertTimesTime.millisecond(indexes.payment.gateway.expiredPaymentDate)}
                </p>
              </React.Fragment>}
            {tabsShowItem === 2 &&
              <p
                className="not-send">
                {labelNotSent}
              </p>}
            {tabsShowItem === 3 &&
              <React.Fragment>
                <p className="label-text">
                  {labelInDelivery}
                </p>
                <p className="label-time">
                  {convertTimesTime.millisecond(indexes.orderActivityDate.shipmentDate)}
                </p>
              </React.Fragment>}
            {tabsShowItem === 4 &&
              <React.Fragment>
                <p className="label-text">
                  {labelFinish}
                </p>
                <p className="label-time">
                  {convertTimesTime.millisecond(indexes.orderActivityDate.receivedDate)}
                </p>
              </React.Fragment>}
            {tabsShowItem === 5 &&
              <React.Fragment>
                <p
                  style={{
                    marginBottom: 0,
                    color: "black"
                  }}>
                  {labelCancel} {indexes.orderCancel && indexes.orderCancel.cancelBy}
                </p>
                <p className="label-time">
                  {convertTimesTime.millisecond(indexes.orderCancel && indexes.orderCancel.createdDate)}
                </p>
              </React.Fragment>}
          </Col>
          <Col md={12}>
            <font className="waiting-payment__total-received">
              Total Pesenan : &nbsp;
            <h4 className="waiting-payment__total-amount">
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
