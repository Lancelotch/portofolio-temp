import React from 'react';
import { Steps, Icon, Card} from 'antd';
import { receivedOrderIcon, cancelOrderIcon, paymentOrder } from '../../library/iconTracking';
import "./style.sass";
import "./styleCustomer.sass";
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusCancel = props => {
  const { orderDate, cancelBy, orderDraftCancel } = props
  return (
    <div style={{ marginTop: 30 }}>
      <Card>
        <div className={cancelBy === "ADMIN" | cancelBy === "admin" | cancelBy === "SYSTEM" ? "stepOrderStatusCancelBySystem" : "stepOrderStatusCancel"}>
          <Steps size="small" labelPlacement="vertical">
            <Step
              status="finish"
              title="Pesenan Dibuat"
              description={convertTimesTime.millisecond(orderDate.orderDate)}
              icon={<Icon style={{ color: "#004853" }}
                component={receivedOrderIcon} />}>
            </Step>
            {cancelBy === "ADMIN" | cancelBy === "admin" | cancelBy === "SYSTEM" &&
              <Step
                status={"finish"}
                description={convertTimesTime.millisecond(orderDraftCancel.createdDate)}
                title="Pesenan Dibatalkan"
                icon={<Icon className={"iconOrderStatusStepActive"}
                  component={paymentOrder} />}
              />}
            <Step
              status={"finish"}
              description={convertTimesTime.millisecond(orderDraftCancel && orderDraftCancel.createdDate)}
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

