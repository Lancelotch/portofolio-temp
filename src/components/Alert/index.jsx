import React from "react";
import {Alert as AlertAnt} from 'antd';
import PropTypes from 'prop-types';
import './style.css';

export default function Alert({message, type, afterClose}) {
  return (
    <div className="pop-up">
      <AlertAnt message={message} type={type} closable afterClose={afterClose}/>
    </div>
  );
}

Alert.proptype= {
    message: PropTypes.string.isRequired,
    type: PropTypes.string
}

Alert.defaultProps = {
    type: "success"
}
