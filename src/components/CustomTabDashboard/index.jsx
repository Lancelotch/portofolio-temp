import React from "react";
import { Tabs } from "antd";

const TabPane = Tabs;

export const CustomTabPane = ({ my_prop,className, title, key, ...restProps }) => (
    <TabPane className={className} tab={title} key={key} {...restProps}>
      {my_prop}
    </TabPane>
  );