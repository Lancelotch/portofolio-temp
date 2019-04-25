import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col } from "antd";
import currencyRupiah from "../../library/currency";

const WaitingPayment = props => {
  const {
    endDatePay,
    indexes,
    orderId,
    label,
    index,
    indexDalamPengiriman,
    labelPengiriman,
    estimateShippingDate
  } = props;
  return (
    <React.Fragment>
      <div className="waitingPayment" key={orderId}>
        <Row>
          {indexDalamPengiriman === 2 &&
            <Col md={12}>
              <p
                className="dalamProsesPengiriman"
                style={{
                  paddingLeft: 15
                }}>
                {labelPengiriman}
              </p>
            </Col>
          }
          {indexDalamPengiriman === 3 &&
            <Col md={12}>
              <p
                style={{
                  paddingLeft: 15,
                  color: "#777777"
                }}>
                {labelPengiriman}
              </p>
              <p style={{
                color: " #BBBBBB",
                fontSize: 16,
                marginLeft: 15
              }}>
                {estimateShippingDate}
              </p>
            </Col>
          }
          {index === 1 &&
            <Col md={12}>
              <b>{label}</b>
              <p className="waitingPayment__endDatePay">
                {convertTimesTime.millisecond(endDatePay)}
              </p>
            </Col>
          }
          <Col md={12}>
            <font className="waitingPayment__totalReceived">Total Pesenan : &nbsp;
            <h4 style={{ display: "unset", fontSize: 20 }}>
                {currencyRupiah(indexes[0].totalAmount)}
              </h4>
            </font>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default WaitingPayment;
