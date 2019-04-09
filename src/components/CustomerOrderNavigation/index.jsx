import React, { Component } from "react";
import { Tabs, Icon } from "antd";
import { CustomTabPane } from "../CustomerNavigation/CustomerNavigationContainer";
import ProductOrder from "../ProductOrder/ProductOrderContainer(Dummy)";

class CustomerOderNavigation extends Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <CustomTabPane key={"1"} tab={<span>{"Belum Bayar"}</span>}
        my_prop={<ProductOrder/>}
        />
        <CustomTabPane key={"2"} tab={<span>{"Belum Dikirim"}</span>} />
        <CustomTabPane key={"3"} tab={<span>{"Dalam Pengiriman"}</span>} />
        <CustomTabPane key={"4"} tab={<span>{"Selesai"}</span>} />
        <CustomTabPane key={"5"} tab={<span>{"Batal"}</span>} />
      </Tabs>
    );
  }
}

export default CustomerOderNavigation;
