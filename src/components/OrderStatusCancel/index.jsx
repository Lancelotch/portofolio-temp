import React from 'react';
import { Steps, Icon, Card } from 'antd';
import { receivedOrderIcon, cancelOrderIcon, paymentOrder } from '../../library/iconTracking';
import "./style.sass";
import "./styleCustomer.sass";
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusCancel = props => {
  const { orderDate, cancelBy } = props
  return (
    <React.Fragment>
      <Card>
        <div className={cancelBy ===  "ADMIN" | cancelBy === "admin" |cancelBy ===  "SYSTEM" ? "stepOrderStatusCancelBySystem" : "stepOrderStatusCancel"}>
          <Steps size="small" labelPlacement="vertical">
            <Step
              status="finish"
              title="Pesenan Dibuat"
              description={convertTimesTime.millisecond(orderDate)}
              icon={<Icon style={{ color: "#004853" }}
                component={receivedOrderIcon} />}>
            </Step>
            {cancelBy ===  "ADMIN" | cancelBy === "admin" | cancelBy ===  "SYSTEM"  &&
            <Step
              status={"finish"}
              description={convertTimesTime.millisecond(orderDate)}
              title="Pesenan Dibatalkan"
              icon={<Icon className={"iconOrderStatusStepActive"}
                component={paymentOrder} />}
            />
  }
            <Step
              status={"finish"}
              description={convertTimesTime.millisecond(orderDate)}
              title="Pesenan Dibatalkan"
              icon={<Icon className={"iconOrderStatusStepActive"}
                component={cancelOrderIcon} />}
            />
          </Steps>
        </div>
      </Card>
    </React.Fragment>
  );
};

export default OrderStatusCancel;

