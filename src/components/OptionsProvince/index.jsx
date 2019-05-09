import React from "react";
import { Select } from "antd";

const Option = Select.Option;

const OptionsProvince = props => {
  const { data } = props;
  return data.map(data => {
    return data.province_id === "6" && 
        <Option
          value={`${data.province_id}|${data.province}`}
          key={data.province_id}
        >
          {data.province}
        </Option>
  });
};

export default OptionsProvince;
