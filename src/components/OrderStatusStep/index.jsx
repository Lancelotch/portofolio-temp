import React from 'react';
import { Steps, Icon, Affix } from 'antd';
import { receivedOrderIcon, paymentOrder, deliveryOrderIcon } from '../../library/iconTracking';
import "./style.sass"
import convertTimesTime from '../../library/convertTimestime';


const Step = Steps.Step;


const OrderStatusStep = (props) => {
  const {
    orderDate,
    tabsNotSent,
    tabsInDelivery,
    actionShowOrderListWaitingPayment,
    labelTabDetails,
    top,
    tabsFinish } = props;
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
          {labelTabDetails}
        </h2>
        <Affix offsetTop={top}>
          <button
            style={{ float: "right" }}
            className="buttonOrderDetails"
            onClick={() => actionShowOrderListWaitingPayment()}>
            <Icon type="arrow-left" /> &nbsp;
            Kembali
    </button>
        </Affix>
      </div>
      <div className="stepOrderStatus" style={{ padding: 15, marginTop: 15 }}>
        <Steps size="small" labelPlacement="vertical">
          <Step
            status="finish"
            title="Pesanan Dibuat"
            description={convertTimesTime.millisecond(orderDate)}
            icon={<Icon style={{ color: "#004853" }}
              component={receivedOrderIcon} />}>
          </Step>
          <Step
            status={tabsNotSent === 2 ? "finish" : ""}
            description={tabsNotSent === 2 ? convertTimesTime.millisecond(orderDate) : ""}
            title="Pesanan Dibayarkan"
            icon={<Icon className={tabsNotSent === 2 ? "iconOrderStatusStepActive" : ""}
              component={paymentOrder} />}
          />
          {
            <Step
              status={tabsInDelivery === 3 && tabsNotSent === 2 ? "finish" : ""}
              description={tabsInDelivery === 3 && tabsNotSent === 2 ? convertTimesTime.millisecond(orderDate) : ""}
              title="Pesan Dikirim"
              icon={<Icon className={tabsInDelivery === 3 && tabsNotSent === 2 ? "iconOrderStatusStepActive" : ""}
                component={deliveryOrderIcon} />}
            />}
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
    </React.Fragment>
  );
};

export default OrderStatusStep;

