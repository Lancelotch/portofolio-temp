import React from "react";
import {Alert as AlertAnt} from 'antd';
import propTypes from 'prop-types';
import classNames from 'classnames';
import style from './style.sass';

export default function Alert({title, type, afterClose, showIcon, description, animation}) {
  const classNamesStyle = classNames.bind(style)
  const cssClasses = classNamesStyle({
    'mp-alert-animation-moveBottom' : (animation === 'moveBottom'),
    'mp-alert' : (animation === 'default')
  })
  
  return (
    <div className="alert-container">
        <div className={cssClasses}>
          <AlertAnt 
            showIcon={showIcon}
            message={title} 
            type={type} 
            closable 
            afterClose={afterClose}
            description={description}
            animation={animation}
          />
        </div>
    </div>
  );
}

Alert.propTypes= {
    title: propTypes.string.isRequired,
    type: propTypes.oneOf(['success', 'warning', 'info', 'error']),
    showIcon: propTypes.bool,
    description : propTypes.string,
    animation : propTypes.oneOf(['default', 'moveBottom'])
}

Alert.defaultProps = {
    type: "success",
    showIcon : false,
    animation : "default"
}
