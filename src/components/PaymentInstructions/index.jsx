import React from "react";
import { Collapse } from "antd";

const PaymentInstructions = props => {
  const { instruction } = props;
  return (
    <Collapse defaultActiveKey={["1"]} accordion>
      <Collapse.Panel showArrow={false} header="Cara Bayar" key="1">
        <ol>{instruction}</ol>
      </Collapse.Panel>
    </Collapse>
  );
};

export default PaymentInstructions;
