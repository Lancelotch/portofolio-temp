import React, { useState, useEffect } from "react";
import { Popover as AntPopover, Icon } from "antd";
import PropTypes from "prop-types";
import FormLogin from "../FormLogin";
import UserMenu from "./UserMenu";
import DataSource from "../../hoc/DataSource";
import { PATH_CUSTOMER } from "../../services/path/customer";

export default function Popover({ isAuthenticated }) {
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<FormLogin />);

  useEffect(() => {
    setVisible(false);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated ? setContent(<UserMenu />) : setContent(<FormLogin />);
  }, [visible]);

  const Label = ({ name }) => <span>{name}</span>;

  const title = isAuthenticated ? <p>Profile</p> : null;
  const label = isAuthenticated ? (
    <DataSource
      url={PATH_CUSTOMER.CUSTOMER}
      withAuth={true}
      render={data => <Label name={data.data.data.name} />}
    />
  ) : (
    <span>Login</span>
  );

  return (
    <React.Fragment>
      <div style={{ display: "flex" }}>
        <AntPopover
          placement="bottomRight"
          title={title}
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={val => setVisible(val)}
        >
          <span onClick={() => setVisible(!visible)}>
            {label}
            <Icon className="header__name-icon" type="down" />
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
