import React from "react";
import classNames from "classnames";
import style from "./style.sass";
import { Input as InputAnt, Icon } from "antd";
import propTypes from "prop-types";

export default function Input(props) {
  const classNamesStyle = classNames.bind(style);
  const sassClasses = classNamesStyle({
    "mp-input-medium": props.size === "medium",
    "mp-input-large": props.size === "large",
    "mp-input-x-large": props.size === "xlarge"
  });

  let inputPrefixIcon = null;
  if (props.icon) {
    inputPrefixIcon = <Icon type={props.icon} />;
  }

  let inputLargePrefix = null;
  if (props.size === "large" && props.icon) {
    inputLargePrefix = "mp-input-large-prefix";
  }

  let inputXlargePrefix = null;
  if (props.size === "xlarge" && props.icon) {
    inputXlargePrefix = "mp-input-x-large-prefix";
  }

  let fixStyling = [
    "mp-input-component",
    sassClasses,
    inputXlargePrefix,
    inputLargePrefix
  ].join(" ");

  if (props.type === "default") {
    return (
      <InputAnt {...props} className={fixStyling} prefix={inputPrefixIcon} />
    );
  }

  if (props.type === "password") {
    return (
      <InputAnt.Password
        {...props}
        className={fixStyling}
        prefix={inputPrefixIcon}
      />
    );
  }
}

Input.propTypes = {
  type: propTypes.string,
  placeholder: propTypes.string,
  value: propTypes.string,
  icon: propTypes.string,
  size: propTypes.oneOf(["medium", "large", "xlarge"]),
  onChange: propTypes.func,
  onKeyUp: propTypes.func,
  maxLength: propTypes.number,
  disabled: propTypes.bool
};

Input.defaultProps = {
  type: "default"
};
