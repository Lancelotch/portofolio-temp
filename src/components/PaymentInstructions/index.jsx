import React from "react";
import { Collapse } from "antd";

const PaymentInstructions = props => {
  const { paymentInstruction } = props;

  return (
    <React.Fragment>
      {paymentInstruction &&
        paymentInstruction.paymentInstructions.map((ins, i) => {
          let index = i === 0 ? "1" : ""
          return (
            <Collapse key={i} defaultActiveKey={[index]} accordion style={{marginTop:15}}>
              <Collapse.Panel  header="Cara Bayar" key={index}>
                <div key={i} dangerouslySetInnerHTML={{ __html: ins.instruction }} />
              </Collapse.Panel>
            </Collapse>
          )
        })
      }
    </React.Fragment>
  );
};

export default PaymentInstructions;
