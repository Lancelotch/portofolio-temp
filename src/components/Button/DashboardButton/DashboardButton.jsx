import React from 'react';
import { Button, Icon, Menu, Card } from 'antd';
import PropTypes from "prop-types";
import './style.sass'

const DashboardButton = props => {
    return ( 
        <div>
            <button className='btn-dashboar-user'> {props.icon} {props.ButtonName}</button>
        </div>
     );
}

DashboardButton.propTypes = {
    ButtonName: PropTypes.string.isRequired,
  };

export default DashboardButton;

