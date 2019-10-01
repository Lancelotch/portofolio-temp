import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { Col, Row } from "antd";
import PropTypes from "prop-types";

const loopSkeleton = (
  count,
  height,
  width,
  leftMargin,
  rightMargin,
  topMargin,
  color,
  highlightColor
) => {
  let skeletons = [];
  for (let i = 0; i <= count; i++) {
    skeletons.push(
      <Col
        key={i}
        style={{
          marginLeft: leftMargin,
          marginRight: rightMargin,
          marginTop: topMargin
        }}
      >
        <SkeletonTheme color={color} highlightColor={highlightColor}>
          <Skeleton height={height} width={width} />
        </SkeletonTheme>
      </Col>
    );
  }
  return skeletons;
};

const SkeletonCustom = props => {
  const {
    count,
    height,
    width,
    leftMargin,
    rightMargin,
    topMargin,
    color,
    highlightColor
  } = props;
  return (
    <React.Fragment>
      <Row type="flex">
        {loopSkeleton(
          count,
          height,
          width,
          leftMargin,
          rightMargin,
          topMargin,
          color,
          highlightColor
        )}
      </Row>
    </React.Fragment>
  );
};

SkeletonCustom.propTypes = {
  count: PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.number,
  leftMargin: PropTypes.number,
  rightMargin: PropTypes.number,
  topMargin: PropTypes.number
};

export default SkeletonCustom;
