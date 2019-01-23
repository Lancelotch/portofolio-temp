import React from "react";
import PropTypes from "prop-types";
import { Col } from "antd";
import { Skeleton } from "antd";

const Inspiration = props => {
  return (
    <Col md={{span: 24}}>
        {props.imageUrl ? (
          <img src={props.imageUrl} style={{maxWidth: "100%",display:"block",margin: "auto"}} alt="" id={props.id} onClick={props.url} />
        ) : (
          <Skeleton />
        )}
    </Col>
  );
};

Inspiration.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string
};

export default Inspiration;
