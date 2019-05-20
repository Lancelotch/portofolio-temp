import React from "react";
import { Collapse } from "antd";

const PaymentInstructions = props => {
  const { paymentInstruction } = props;
  console.log(paymentInstruction);
  const instructions = paymentInstruction.instructions
  return (
    <React.Fragment>
      {paymentInstruction &&
        <Collapse defaultActiveKey={["1"]} accordion>
          <Collapse.Panel showArrow={false} header="Cara Bayar" key="1">
          {instructions &&
            <ol>
              {
                instructions.map((ins, i) => {
                  return <li key={i}>{ins}</li>
                })
              }
            </ol>
      }
          </Collapse.Panel>
        </Collapse>
      }
    </React.Fragment>
  );
};

export default PaymentInstructions;
