import React, { Component } from 'react';

const FrontImage = (props) => {
    return (
        <div>
            <img className="front-image" src={props.src} />
        </div>
    );
}

export default FrontImage;