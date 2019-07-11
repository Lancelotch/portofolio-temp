import React from "react";
import { Tabs } from "antd";

const TabPane = Tabs.TabPane;

export const CustomTabPane = ({ my_prop,className, title, key, ...restProps }) => (
    <TabPane forceRender={true} className={className} tab={title} key={key} {...restProps}>
      {my_prop}
    </TabPane>
  );