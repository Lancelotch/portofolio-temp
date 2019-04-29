import React from 'react';
import { Steps, Icon } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon } from '../../library/iconTracking';
import "../../components/OrderStatusStep/style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusStep = props => {
  const { orderDate} = props
  return (
    <div className="stepOrderStatusCancel stepOrderStatus" style={{ padding: 15 }}>
      <Steps size="small" labelPlacement="vertical">
        <Step
          status="finish"
          title="Pesanan Dibuat"
          description={convertTimesTime.millisecond(orderDate)}
          icon={<Icon style={{ color: "#004853" }}
            component={receivedOrderIcon} />}>
        </Step>
        <Step
          status={"finish"}
          description={convertTimesTime.millisecond(orderDate)}
          title="Pesanan Dibatalkan"
          icon={<Icon className={"iconOrderStatusStepActive"}
            component={paymentOrder} />}
        />
        
      </Steps>
    </div>
  );
};

export default OrderStatusStep;

