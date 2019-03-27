import React from "react";
import { Select } from "antd";
import PropTypes from 'prop-types';

const Option = Select.Option;

const options = data => {
  var options = [];
  data.map(data => {
    data.province_id === "6" &&
    options.push(<Option value={`${data.province_id}|${data.province}`} key={data.province_id}>{data.province}</Option>);
  });
  return options;
};

const SelectProvince = props => {
  return (
    <Select
      showSearch
      //style={{ width: 200 }}
      placeholder="Select a province"
      optionFilterProp="children"
      onChange={(value)=>props.onChange(value)}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {options(props.data)}
    </Select>
  );
};

SelectProvince.propTypes = {
    data: PropTypes.arrayOf(Object)
}

export default SelectProvince;
