import React from 'react';
import { Steps, Icon, Card} from 'antd';
import { receivedOrderIcon, cancelOrderIcon, paymentOrder } from '../../library/iconTracking';
import "./style.sass";
import "./styleCustomer.sass";
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusCancel = props => {
  const { orderDate, orderCancel } = props
  return (
    <div style={{ marginTop: 30 }}>
      <Card>
        <div className={orderCancel.cancelBy === "ADMIN" | orderCancel.cancelBy === "admin" | orderCancel.cancelBy === "SYSTEM" ? "stepOrderStatusorderCancel.cancelBySystem" : "stepOrderStatusCancel"}>
          <Steps size="small" labelPlacement="vertical">
            <Step
              status="finish"
              title="Pesenan Dibuat"
              description={convertTimesTime.millisecond(orderDate.orderDate)}
              icon={<Icon style={{ color: "#004853" }}
                component={receivedOrderIcon} />}>
            </Step>
            {orderCancel.cancelBy === "ADMIN" | orderCancel.cancelBy === "admin" | orderCancel.cancelBy === "SYSTEM" &&
              <Step
                status={"finish"}
                description={convertTimesTime.millisecond(orderCancel.createdDate)}
                title="Pesenan Dibatalkan"
                icon={<Icon className={"iconOrderStatusStepActive"}
                  component={paymentOrder} />}
              />}
            <Step
              status={"finish"}
              description={convertTimesTime.millisecond(orderCancel && orderCancel.createdDate)}
              title="Pesenan Dibatalkan"
              icon={<Icon className={"iconOrderStatusStepActive"}
                component={cancelOrderIcon} />}
            />
          </Steps>
        </div>
      </Card>
    </div>
  );
};

export default OrderStatusCancel;

