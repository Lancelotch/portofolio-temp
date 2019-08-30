import React from "react";
import PropTypes from "prop-types";
import strings from "../../localization/localization";

export default function Greeting({ isAuthenticated }) {
  return (
    <React.Fragment>
      {isAuthenticated !== true ? (
        <div>{strings.header_greeting}</div>
      ) : (
        <div>{strings.header_greeting_auth}</div>
      )}
    </React.Fragment>
  );
}

Greeting.propTypes = {
    isAuthenticated: PropTypes.bool
}
