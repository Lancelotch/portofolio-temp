import React from 'react'
import {Button as ButtonAnt} from 'antd'

const Button = props => {
    return(
        <ButtonAnt>{props.children}</ButtonAnt>
    )
}

export default Button;
