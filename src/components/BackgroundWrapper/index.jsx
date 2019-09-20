import React from 'react';
import "./style.sass";

function BackgroundWrapper(props) {
    return (
         <div className="mp-background-center-wrapper">
         {props.children}
        </div>
    );
};

export default BackgroundWrapper;