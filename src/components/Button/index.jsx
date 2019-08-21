import React from 'react'
import { Button as ButtonAnt } from 'antd'
import classNames from 'classnames';
import propTypes from 'prop-types';
import style from "./style.sass";

const classNamesStyle = classNames.bind(style)

const cssClasses = value => classNamesStyle({
    'mp-btn-primary': (value.type === 'primary'),
    'mp-btn-default': (value.type === 'default'),
    'mp-btn-secondary': (value.type === 'secondary'),
    'mp-btn-white': (value.type === 'white'),
    'mp-btn-danger': (value.type === 'danger'),
    'mp-btn-link': (value.type === 'link'),
    'mp-btn-width-full': (value.width === 'full'),
    'mp-btn-width-90': (value.width === '90'),
    'mp-btn-size-large': (value.size === 'large'),
    'mp-btn-size-small': (value.size === 'small'),
    'mp-btn-grey': (value.type === 'grey'),
    'mp-margin-button-small': (value.margin === 'small'),
    'mp-margin-button-right-small':(value.marginRight === 'small'),
    'mp-button-disabled': (value.disabled === true)
});

const Button = props => {
    return (
        <ButtonAnt  className={cssClasses(props)} {...props}>{props.children}</ButtonAnt>
    )
}

Button.propTypes = {
    type: propTypes.oneOf(['primary', 'default','secondary','white','link','danger','grey','circle-small']),
    width: propTypes.oneOf(['default', 'full','90']),
    size: propTypes.oneOf(['default','large']),
    margin: propTypes.oneOf(['small','medium','large'])
}

Button.defaultProps = {
    type: 'default',
    width: 'default',
    size: 'default'
}

export default Button;
