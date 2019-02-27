import React from "react";
import { Spin } from "antd";
import "./style.sass";
import PropTypes from 'prop-types';

const Spinner = props => {
  return (
    <div className="spin">
      <Spin size={props.size} />
    </div>
  );
};

Spinner.propTypes = {
    size : PropTypes.string
}

export default Spinner;