import React, { useState, useEffect } from "react";
import "./style.sass";
import { Popover as AntPopover, Icon } from "antd";
import PropTypes from "prop-types";
import FormLogin from "../FormLogin";
import UserMenu from "./UserMenu";
import { useRootContext } from "../../hoc/RootContext";

export default function Popover() {
  const { authBody, authProfile, isAuthenticated, handleLogout } = useRootContext();
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<FormLogin />);
  console.log("cek aobo", authBody)
  console.log("cek aupro", authProfile)
  
  useEffect(() => {
    setVisible(false);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated
      ? setContent(<UserMenu handleLogout={handleLogout} />)
      : setContent(<FormLogin />);
  }, [visible]);

  const label = isAuthenticated ? (
    <span>{authProfile.name}</span>
  ) : (
    <span>Login</span>
  );

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <AntPopover
          placement="bottomRight"
          overlayClassName="mp-popover"
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={val => setVisible(val)}
        >
          <span
            className="mp-main-header-popover__box"
            onClick={() => setVisible(!visible)}
          >
            {label}
            <Icon className="mp-main-header-popover__name-icon" type="down" />
          </span>
        </AntPopover>
      </div>
    </React.Fragment>
  );
}

Popover.propTypes = {
  name: PropTypes.string,
  isAuthenticated: PropTypes.bool
};
