import React from "react";
import classNames from "classnames";
import style from "./style.sass";
import { Input } from "antd";
import propTypes from "prop-types";

export default function Search(props) {
  const { Search } = Input;
  const classNamesStyle = classNames.bind(style);
  const sassClasses = classNamesStyle({
    "mp-search-medium": props.size === "medium",
    "mp-search-large": props.size === "large"
  });

  const fixStyle = ["mp-search-component", sassClasses].join(" ");

  return <Search {...props} className={fixStyle} />;
}

Search.propTypes = {
  placeholder: propTypes.string,
  size: propTypes.oneOf(["medium", "large"]),
  onChange: propTypes.func,
  onSearch: propTypes.func
};
