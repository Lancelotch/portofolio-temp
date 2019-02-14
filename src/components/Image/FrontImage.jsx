import React from 'react';

const FrontImage = (props) => {
    return (
        <div>
            <img className="front-image" src={props.src} alt=""/>
        </div>
    );
}

export default FrontImage;