import React from "react";
import "./style.sass";
import { Select } from "antd";

const { Option } = Select;

const SortListProduct = props => {
  return (
    <div className="mp-select-dropdown">
      <Select
        defaultValue={props.defaultValue}
        onChange={value => props.onChange(value)}
      >
        <Option value={props.defaultValue}>
          <b style={{ fontWeight: 600 }}>Paling Baru</b>
        </Option>
        <Option value={props.valueOld}>
          <b style={{ fontWeight: 600 }}>Paling Lama</b>
        </Option>
        <Option value={props.valueLow}>
          <b style={{ fontWeight: 600 }}>Paling Murah</b>
        </Option>
        <Option value={props.valueHigh}>
          <b style={{ fontWeight: 600 }}>Paling Mahal</b>
        </Option>
      </Select>
    </div>
  );
};

export default SortListProduct;
