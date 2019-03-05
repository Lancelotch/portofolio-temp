import React from "react";
import { Select } from "antd";

const {Option} = Select;

const SortListProduct = props => {
  return (
    <Select defaultValue="createdDate|desc" onChange={(value)=>props.onChange(value)}>
      <Option value="createdDate|desc">Terbaru</Option>
      <Option value="price.idr|asc">Termurah</Option>
      <Option value="price.idr|desc">Termahal</Option>
    </Select>
  );
};

export default SortListProduct;
