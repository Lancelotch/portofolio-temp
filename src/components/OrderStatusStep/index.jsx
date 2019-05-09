import React from 'react';
import { Steps, Icon } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon } from '../../library/iconTracking';
import "./style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusStep = props => {
  const { orderDate, index, indexPesanDikirim, indexPesanDiterima } = props
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
          status={index === 2 ? "finish" : ""}
          description={index === 2 ? convertTimesTime.millisecond(orderDate):""}
          title="Pesanan Dibayarkan"
          icon={<Icon className={index === 2 ? "iconOrderStatusStepActive" : ""}
            component={paymentOrder} />}
        />
        <Step
          status={indexPesanDikirim === 3 && index === 2 ? "finish" : ""}
          description={indexPesanDikirim === 3 && index === 2 ? convertTimesTime.millisecond(orderDate):""}
          title="Pesan Dikirim"
          icon={<Icon className={indexPesanDikirim === 3 && index === 2 ? "iconOrderStatusStepActive" : ""}
            component={deliveryOrderIcon} />}
        />
        <Step
          status={indexPesanDiterima === 4 && index === 2 && indexPesanDikirim === 3 ? "finish" : ""}
          description={indexPesanDiterima === 4 && index === 2 && indexPesanDikirim === 3 ? convertTimesTime.millisecond(orderDate):""}
          title="Pesanan Diterima"
          icon={<Icon component={receivedOrderIcon}
            className={indexPesanDiterima === 4 && index === 2 && indexPesanDikirim === 3 ? 
              "iconOrderStatusStepActive" : ""} />}
        />
      </Steps>
    </div>
  );
};

export default OrderStatusStep;

