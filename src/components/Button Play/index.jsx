import React from 'react';
import style from "./style.sass";
import PropTypes from "prop-types";
import classNames from 'classnames';

export default function ButtonPlay(props) {
    const classNamesStyle = classNames.bind(style)
    const cssClasses = classNamesStyle({
        'mp-btn-thumbnail-play': (props.type === 'thumbnail'),
        'mp-btn-default-play': (props.type === 'default')
    });
    return (
        <div className={cssClasses} />
    );
};

ButtonPlay.propTypes = {
    type: PropTypes.oneOf(['default', 'thumbnail'])
};


ButtonPlay.defaultProps = {
    type: 'default'
}
