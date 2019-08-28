import React,{useState, useEffect} from "react";
import { Popover as AntPopover } from "antd";
import PropTypes from 'prop-types';
import FormLogin from "../FormLogin";
import { useRootContext } from "../../hoc/RootContext";

export default function Popover({ name, isAuthenticated }) {
  const { handleLogout } = useRootContext();
  const [visible, setVisible] = useState(false);
  const [content, setContent] = useState(<FormLogin />);

  const UserMenu = function() {
    return (
      <div>
        <p>Pesenan Saya</p>
        <p>Pengaturan Privasi</p>
        <p>Hubungi Kami</p>
        <p onClick={()=>actionPopover('logout')}>Log Out</p>
      </div>
    )
  }

  useEffect(()=>{
    setVisible(false);
  }, [isAuthenticated]);

  useEffect(() => {
    isAuthenticated ?  setContent(<UserMenu />) : setContent(<FormLogin/>);
  }, [visible])

  function actionPopover(action) {
    switch (action) {
      case "profile":
        console.log('profile');
        break;
      case "logout":
        handleLogout();
        break;
      default:
        break;
    }
  }

  const title = isAuthenticated ? <p>Profile</p> : null;
  const label = isAuthenticated ? name : "Login";
  
  return (
    <React.Fragment>
      <div style={{display: "flex"}}>
        <p onClick={() => setVisible(true)}>{label}</p>
        <AntPopover
          placement="bottomRight"
          title={title}
          content={content}
          trigger="click"
          visible={visible}
          onVisibleChange={() => setVisible(false)}
        >
        </AntPopover>
      </div>
    </React.Fragment>
  );
}

Popover.propType = {
  name : PropTypes.string,
  isAuthenticated: PropTypes.bool,
}
