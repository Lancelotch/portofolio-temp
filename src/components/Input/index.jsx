import React from "react";
import classNames from "classnames";
import style from "./style.sass";
import { Input as InputAnt, Icon } from "antd";
import propTypes from "prop-types";
import Button from "../Button";

export default function Input(props) {
  const classNamesStyle = classNames.bind(style);
  const sassClasses = classNamesStyle({
    "mp-input-small": props.size === "small",
    "mp-input-medium": props.size === "medium",
    "mp-input-large": props.size === "large",
    "mp-input-x-large": props.size === "xlarge"
  });

  let inputPrefixIcon, inputLargePrefix, inputXlargePrefix;

  if (props.icon) {
    inputPrefixIcon = <Icon type={props.icon} />;
  }
  if (props.size === "large" && props.icon) {
    inputLargePrefix = "mp-input-large-prefix";
  }
  if (props.size === "xlarge" && props.icon) {
    inputXlargePrefix = "mp-input-x-large-prefix";
  }

  let fixStyling = [sassClasses, inputLargePrefix, inputXlargePrefix].join(" ");

  let propsAnt = {
    ...props,
    size: props.size === "xlarge" || "medium" ? undefined : props.size
  }

  delete propsAnt.onButtonClick;

  let resultInput;
  if (props.type === "default") {
    resultInput = (
      <InputAnt {...propsAnt} className={fixStyling} prefix={inputPrefixIcon} />
    );
  }

  if (props.type === "password") {
    resultInput = (
      <InputAnt.Password
        {...propsAnt}
        className={fixStyling}
        prefix={inputPrefixIcon}
      />
    );
  }

  if (props.buttontext !== "") {
    resultInput = (
      <div className="mp-input-with-button">
        {resultInput}
        <Button type="teal" size={props.size} onClick={props.onButtonClick}>
         {props.buttontext}
        </Button>
      </div>
    );
  }

  return <div>{resultInput}</div>
}

Input.propTypes = {
  type: propTypes.oneOf(["default", "password"]),
  placeholder: propTypes.string,
  value: propTypes.string,
  icon: propTypes.string,
  size: propTypes.oneOf(["small", "medium", "large", "xlarge"]),
  onChange: propTypes.func,
  onKeyUp: propTypes.func,
  maxLength: propTypes.number,
  disabled: propTypes.bool,
  buttontext: propTypes.string,
  onButtonClick: propTypes.func
};

Input.defaultProps = {
  type: "default",
  size: "small",
  buttontext: ""
};
