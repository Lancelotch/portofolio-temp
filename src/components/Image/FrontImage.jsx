import React from 'react';

const FrontImage = (props) => {
    return (
        <React.Element>
            <img className="front-image" src={props.src} alt=""/>
        </React.Element>
    );
}

export default FrontImage;