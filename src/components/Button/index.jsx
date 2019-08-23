import React from 'react'
import { Button as ButtonAnt } from 'antd'
import classNames from 'classnames';
import propTypes from 'prop-types';
import style from "./style.sass";


export default function Button(props) {
    const classNamesStyle = classNames.bind(style)
    const cssClasses = classNamesStyle({
        'mp-btn-primary': (props.type === 'primary'),
        'mp-btn-default': (props.type === 'default'),
        'mp-btn-secondary': (props.type === 'secondary'),
        'mp-btn-white': (props.type === 'white'),
        'mp-btn-danger': (props.type === 'danger'),
        'mp-btn-link': (props.type === 'link'),
        'mp-btn-disabled': (props.type === 'disabled'),
        'mp-btn-width-full': (props.width === 'full'),
        'mp-btn-size-large': (props.size === 'large'),
        'mp-btn-size-small': (props.size === 'small'),
        'mp-btn-grey': (props.type === 'grey'),
        'mp-margin-button-small': (props.margin === 'small'),
        'mp-margin-button-right-small': (props.marginright === 'small'),
        'mp-margin-button-left-small': (props.marginleft === 'small'),
        'mp-button-disabled': (props.disabled === true)
    });    
    return <ButtonAnt style={{width: `${props.width}${`%`}`}} className={cssClasses} {...props}>{props.children}</ButtonAnt>
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'default', 'secondary', 'white', 'link', 'danger', 'grey', 'circle-small', 'disabled']),
    width: propTypes.oneOf(['default', 'full', 'string number of percentage']),
    size: propTypes.oneOf(['default', 'large']),
    margin: propTypes.oneOf(['small', 'medium', 'large'])
}

Button.defaultProps = {
    type: 'default',
    width: 'default',
    size: 'default'
}

