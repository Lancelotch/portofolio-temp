import React from "react";
import { Popover as AntPopover } from "antd";
import PropTypes from 'prop-types';
import Login from "components/Login";
export default function Popover({ name, isAuthenticated, onClick }) {
  const text = <p>Profile</p>;
  const content = (
    <div>
      <p>Pesenan Saya</p>
      <p>Pengaturan Privasi</p>
      <p>Hubungi Kami</p>
      <p onClick={()=>onClick('logout')}>Log Out</p>
    </div>
  );

  return (
    <React.Fragment>
      {isAuthenticated ? (
        <AntPopover
          placement="bottomRight"
          title={text}
          content={content}
          trigger="click"
        >
          <p>{name}</p>
        </AntPopover>
      ) : (
        <AntPopover
          placement="bottomRight"
          content={<Login />}
          trigger="click"
        >
          <p>Login</p>
        </AntPopover>
      )}
    </React.Fragment>
  );
}

Popover.propType = {
  name : PropTypes.string,
  isAuthenticated: PropTypes.bool,
  onClick: PropTypes.func
}
