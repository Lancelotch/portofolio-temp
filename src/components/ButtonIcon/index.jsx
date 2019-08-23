import React from "react";
import PropTypes from "prop-types";
import { Icon } from "antd";
import "./style.sass";

export default function ButtonIcon(props) {
  return (
      <span className="mp-btn-icon" onClick={props.onClick}>
        <Icon type={props.icon} />
      </span>
  );
};

ButtonIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
