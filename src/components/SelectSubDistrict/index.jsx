import React from "react";
import { Select } from "antd";
import PropTypes from 'prop-types';

const Option = Select.Option;

const options = data => {
    var options = [];
    data.map(data => {
      options.push(<Option value={`${data.subdistrict_id}|${data.subdistrict_name}`} key={data.subdistrict_id}>{data.subdistrict_name}</Option>);
    });
    return options;
  };

const SelectSubDistrict = props => {
  return (
    <Select
      showSearch
      style={props.style}
      placeholder="Pilih Kecamatan"
      optionFilterProp="children"
      onChange={props.onChange}
      onFocus={props.handleFocus}
      onBlur={props.handleBlur}
      filterOption={(input, option) =>
        option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
      disabled={props.disabled}
    >
      {options(props.data)}
    </Select>
  );
};

SelectSubDistrict.propTypes = {
    data: PropTypes.arrayOf(Object)
}

export default SelectSubDistrict;
