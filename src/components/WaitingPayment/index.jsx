import React from "react";
import convertTimesTime from "../../library/convertTimestime";
import "./style.sass";
import { Row, Col,  } from "antd";
import currencyRupiah from "../../library/currency";





const WaitingPayment = props => {
  const { endDatePay,indexes,orderId } = props;
  console.log("======> props", props);
  return (
    <React.Fragment>
      <div className="waitingPayment" key={orderId}>
        <b>Bayar Sebelum</b>
        <Row>
          <Col md={12}>
            <p className="waitingPayment__endDatePay">
              {convertTimesTime.millisecond(endDatePay)}
            </p>
          </Col>
          <Col md={12}>
            <p className="waitingPayment__totalReceived">
              Total Pesenan :{" "}
              <h4 style={{ display: "unset", fontSize: 20 }}>
                {currencyRupiah(indexes[0].totalAmount)}
              </h4>
            </p>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default WaitingPayment;
