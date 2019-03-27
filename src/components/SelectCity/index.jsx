import React from "react";
import { Select } from "antd";
import PropTypes from 'prop-types';

const Option = Select.Option;

const options = data => {
    var options = [];
    data.map(data => {
      options.push(<Option value={`${data.city_id}|${data.city_name}`} key={data.city_id}>{data.city_name}</Option>);
    });
    return options;
  };

const SelectCity = props => {
  return (
    <Select
      showSearch
      //style={{ width: 200 }}
      placeholder="Select a city"
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

SelectCity.propTypes = {
    data: PropTypes.arrayOf(Object)
}

export default SelectCity;
