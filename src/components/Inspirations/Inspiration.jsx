import React from "react";
import PropTypes from "prop-types";
import { Row } from "antd";
import { Skeleton } from "antd";

const Inspiration = props => {
  return (
    <Row type="flex" justify="center">
        {props.imageUrl ? (
          <img src={props.imageUrl} alt="" id={props.id} onClick={props.url} />
        ) : (
          <Skeleton />
        )}
    </Row>
  );
};

Inspiration.propTypes = {
  id: PropTypes.string,
  imageUrl: PropTypes.string,
  url: PropTypes.string,
  type: PropTypes.string
};

export default Inspiration;
