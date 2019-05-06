import React from "react";
import { Select } from "antd";

const { Option } = Select;

const SortListProduct = props => {
  return (
    <Select defaultValue="createdDate|desc" onChange={(value) => props.onChange(value)}>
      <Option value="createdDate|desc">
        <b style={{ fontWeight: 600 }}>Terbaru</b>
      </Option>
      <Option value="price.idr|asc">
        <b style={{ fontWeight: 600 }}>Termurah</b>
      </Option>
      <Option value="price.idr|desc">
        <b style={{ fontWeight: 600 }}>Termahal</b>
      </Option>
    </Select>
  );
};

export default SortListProduct;
