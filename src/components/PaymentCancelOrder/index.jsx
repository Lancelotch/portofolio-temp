import React from "react";
import "./style.sass";
import { Row, Col } from "antd";
import convertTimesTime from "../../library/convertTimestime";
import strings from "../../localization/localization";


const PaymentCancelOrder = props => {
  const {
    cancelBy,
    cancelDate
  } = props;
  return (
    <React.Fragment>
      <div className="paymentCancelOrder" key={""}>
        <Row>
          <Col md={24}>
            <p className="paymentCancelOrder__label">
             {strings.cancel_order_by} {cancelBy}
            </p>
            <p className="paymentCancelOrder__labelEstimate">
              {convertTimesTime.millisecond(cancelDate)}
            </p>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
};

export default PaymentCancelOrder;
