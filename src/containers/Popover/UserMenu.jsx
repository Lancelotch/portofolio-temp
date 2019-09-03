import React from "react";
import "./style.sass";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import MP_mascot from "../../assets/img/mascot_monggodesignheroes_2.png";
import { Divider } from "antd";

export default function UserMenu({ handleLogout }) {
  const url = "/dashboard-customer";
  return (
    <div className="mp-user-menu">
      <div className="mp-user-menu__title">
        <img src={MP_mascot} alt="" />
        <Link to={`${url}/${"my-order"}/${"my-account"}`}>
          <span>Profile</span>
        </Link>
      </div>
      <Divider style={{ margin: "12px 0" }} />
      <div className="mp-user-menu__content">
        <Link to={`${url}/${"my-order"}`}>Pesenan Saya</Link>
        <Link to={"/"}>Pengaturan Privasi</Link>
        <Link to={"/"}>Hubungi Kami</Link>
        <Link to={"/"} onClick={() => handleLogout()}>
          Log Out
        </Link>
      </div>
    </div>
  );
}

UserMenu.propType = {
  onClick: PropTypes.func
};
