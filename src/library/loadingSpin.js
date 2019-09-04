import React from "react";
import { Spin } from "antd";

export default function LoadingSpin() {
    return <div className="mp-loading-items">
       <Spin spinning={true} />
    </div>
  }
