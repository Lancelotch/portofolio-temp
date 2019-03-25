import React from 'react';
import { svgReactElement } from '../../pages/Register/registerContainer';

const FrontImage = (props) => {
    return (
        <svgReactElement>
            <img className="front-image" src={props.src} alt=""/>
        </svgReactElement>
    );
}

export default FrontImage;