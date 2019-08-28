import React,{useState} from "react";
import { Popover as AntPopover } from "antd";
import PropTypes from 'prop-types';
import FormLogin from "../FormLogin";
export default function Popover({ name, isAuthenticated, onClick, visible }) {
  const [visibleChange, setVisibleChange] = useState(false);
  const title = isAuthenticated ? <p>Profile</p> : null;
  const label = isAuthenticated ? {name} : "Login";
  const content = isAuthenticated ? (
    <div>
      <p>Pesenan Saya</p>
      <p>Pengaturan Privasi</p>
      <p>Hubungi Kami</p>
      <p onClick={()=>onClick('logout')}>Log Out</p>
    </div> ) : <FormLogin/>;

  return (
    <React.Fragment>
        <AntPopover
          placement="bottomRight"
          title={title}
          content={content}
          visible={visible}
          onVisibleChange={visibleChange}
        >
          <p onClick={()=>setVisibleChange(!visibleChange)}>{label}</p>
        </AntPopover>
    </React.Fragment>
  );
}

Popover.propType = {
  name : PropTypes.string,
  isAuthenticated: PropTypes.bool,
  onClick: PropTypes.func,
  visible: PropTypes.bool
}
