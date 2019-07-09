import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SortListProduct = props => {
  return (
    <Select defaultValue={props.defaultValue} onChange={(value) => props.onChange(value)}>
      <Option value={props.defaultValue}>
        <b style={{ fontWeight: 600 }}>Terbaru</b>
      </Option>
      <Option value={props.valueLow}>
        <b style={{ fontWeight: 600 }}>Termurah</b>
      </Option>
      <Option value={props.valueHigh}>
        <b style={{ fontWeight: 600 }}>Termahal</b>
      </Option>
    </Select>
  );
};

export default SortListProduct;
