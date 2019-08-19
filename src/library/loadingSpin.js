import React from "react";
import { Spin } from "antd";

export const loadingItems = (value)=> {
    return <div className="mp-loading-items">
      {value && <Spin spinning={value} />}
    </div>
  }
