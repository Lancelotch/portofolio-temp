import React from 'react';
import "./style.sass";
import PropTypes from "prop-types";

const ButtonVideo = props => {
    return (
        <div className={props.className} />
    );
};

ButtonVideo.propTypes = {
    className: PropTypes.string
  };

export default ButtonVideo;