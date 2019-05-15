import React from 'react';
import { Steps, Icon, Affix } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon } from '../../library/iconTracking';
import "../../components/OrderStatusStep/style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusStep = props => {
  const { orderDate, actionShowOrderListWaiting, top } = props
  return (
    <React.Fragment>
      <div
        style={{
          paddingBottom: 50,
          paddingTop: 30,
          paddingLeft: 15
        }}>
        <h2
          style={{
            float: "left",
            color: "#4A4A4A",
            fontSize: 24
          }}>
          Batal
       </h2>
        <Affix offsetTop={top}>
          <button
            style={{ float: "right" }}
            className="buttonOrderDetails"
            onClick={() => actionShowOrderListWaiting()}>
            <Icon type="arrow-left" /> &nbsp;
            Kembali
</button>
        </Affix>
      </div>
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
    </React.Fragment>
  );
};

export default OrderStatusStep;

