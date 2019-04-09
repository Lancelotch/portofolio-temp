import React from "react";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

export const CustomTabPane = ({ my_prop, title, key, ...restProps }) => (
    <TabPane tab={title} key={key} {...restProps}>
      {my_prop}
    </TabPane>
  );

  
  