import React from 'react';
import { Steps, Icon, Card } from 'antd';
import { receivedOrderIcon, cancelOrderIcon, paymentOrder } from '../../library/iconTracking';
import "./style.sass";
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusCancel = props => {
  const { orderDate, orderCancel } = props
  return (
    <div className="mp-step-order-cancel-wrapper">
      <Card>
        <div className={
          ((orderCancel && orderCancel.cancelBy === "ADMIN") ||
            (orderCancel && orderCancel.cancelBy === "admin") ||
            (orderCancel && orderCancel.cancelBy === "SYSTEM") ?
            "mp-step-order-cancel-by-system mp-step-order-cancel" :
            "mp-step-order-cancel-by-customer mp-step-order-cancel"
          )}>
          <Steps size="small" labelPlacement="vertical">
            <Step
              status="finish"
              title="Pesenan Dibuat"
              description={convertTimesTime.millisecond(orderDate.orderDate)}
              icon={<Icon style={{ color: "#004853" }}
                component={receivedOrderIcon} />}>
            </Step>
            {orderCancel.cancelBy && orderCancel.cancelBy === "ADMIN" | orderCancel.cancelBy === "admin" | orderCancel.cancelBy === "SYSTEM" &&
              <Step
                status={"finish"}
                description={convertTimesTime.millisecond(orderDate.paymentDate)}
                title="Pesenan Dibayarkan"
                icon={<Icon className={"mp-icon-order-status-step-active"}
                  component={paymentOrder} />}
              />}
            <Step
              status={"finish"}
              description={convertTimesTime.millisecond(orderCancel && orderCancel.createdDate)}
              title="Pesenan Dibatalkan"
              icon={<Icon className={"mp-icon-order-status-step-active"}
                component={cancelOrderIcon} />}
            />
          </Steps>
        </div>
      </Card>
    </div>
  );
};

export default OrderStatusCancel;

