import React from "react";
import { Spin } from "antd";

const Loading = () => (
  <div style={{ textAlign: "center", marginTop: 10 }}>
    <Spin tip="Loading...." />
  </div>
);

export default Loading;
