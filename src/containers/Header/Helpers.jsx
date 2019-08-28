import React from "react";
import PropTypes from "prop-types";
import PATH_URL from "../../routers/path";
import { Link } from "react-router-dom"

export default function Helpers({ onClick }) {
  return (
    <div className="header__menus">
      <Link to={PATH_URL.HOME} className="header__menu">
        Lacak Pengiriman
      </Link>
      <Link to={PATH_URL.HOME} className="header__menu">
        Cara Belanja
      </Link>
      <Link to={PATH_URL.HOME} className="header__menu">
        Tentang Kami
      </Link>
      <Link to={PATH_URL.HOME} className="header__menu">
        Bantuan
      </Link>
    </div>
  );
}

Helpers.propType = {
  onClick: PropTypes.func
};
