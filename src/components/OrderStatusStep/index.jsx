import React from 'react';
import { Steps, Icon, Popover } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon } from '../../library/iconTracking';
import "./style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;

const customDot = (dot, { status, index }) => (
  <Popover content={<span>step {index} status: {status}</span>}>
    {dot}
  </Popover>
);



const OrderStatusStep = (props) => {
  const { orderDate, tabsNotSent, tabsInDelivery, tabsFinish } = props;
  console.log('statuuus trakig',orderDate);
  
  return (
    <div className="stepOrderStatus" style={{ padding: 15 }}>
      <Steps size="small" labelPlacement="vertical">
        <Step
          status="finish"
          title="Pesanan Dibuat"
          description={convertTimesTime.millisecond(orderDate)}
          icon={<Icon style={{ color: "#004853" }}
            component={receivedOrderIcon} />}>
        </Step>
        <Step
          status={tabsNotSent === "2" ? "finish" : ""}
          description={tabsNotSent === "2" ? convertTimesTime.millisecond(orderDate) : ""}
          title="Pesanan Dibayarkan"
          icon={<Icon className={tabsNotSent === "2" ? "iconOrderStatusStepActive" : ""}
            component={paymentOrder} />}
        />
        <Step
          status={tabsInDelivery === 3 && tabsNotSent === 2 ? "finish" : ""}
          description={tabsInDelivery === 3 && tabsNotSent === 2 ? convertTimesTime.millisecond(orderDate) : ""}
          title="Pesan Dikirim"
          icon={<Icon className={tabsInDelivery === 3 && tabsNotSent === 2 ? "iconOrderStatusStepActive" : ""}
            component={deliveryOrderIcon} />}
        />
        <Step
          status={tabsFinish === 4 && tabsNotSent === 2 && tabsInDelivery === 3 ? "finish" : ""}
          description={tabsFinish === 4 && tabsNotSent === 2 && tabsInDelivery === 3 ? convertTimesTime.millisecond(orderDate) : ""}
          title="Pesanan Diterima"
          icon={<Icon component={receivedOrderIcon}
            className={tabsFinish === 4 && tabsNotSent === 2 && tabsInDelivery === 3 ?
              "iconOrderStatusStepActive" : ""} />}
        />
      </Steps>
    </div>
  );
};

export default OrderStatusStep;

