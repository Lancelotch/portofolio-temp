import React from "react";
import { Collapse } from "antd";

const PaymentInstructions = props => {
  const { paymentInstruction } = props;
  console.log(paymentInstruction);
  
  return (
    <React.Fragment>
      {paymentInstruction &&
        <Collapse defaultActiveKey={["1"]} accordion>
          <Collapse.Panel showArrow={false} header="Cara Bayar" key="1">
              {
                paymentInstruction.paymentInstructions.map((ins, i) => {
                  return <p dangerouslySetInnerHTML={{__html:ins.instruction}}/>
                })
              }
          </Collapse.Panel>
        </Collapse>
      }
    </React.Fragment>
  );
};

export default PaymentInstructions;
