import React from 'react';
import Skeleton from "react-loading-skeleton";
import { Col } from "antd";
import PropTypes from 'prop-types';

const loopSkeleton = count => {
  let skeletons = [];
  for (let i = 0; i <= count; i++) {
    skeletons.push(
      <Col md={4}
        key={i}
        style={{
          paddingLeft: 13,
          paddingRight: 13
        }}>
        <Skeleton height={200} />
        <Skeleton count={2} />
      </Col>
    );
  }
  return skeletons;
};

const SkeletonProduct = props => {
  const count = props.count;
  return (
    <React.Fragment>

      {/* <LoopSkeleton count={count} /> */}
      {loopSkeleton(count)}

    </React.Fragment>
  );
};

SkeletonProduct.propTypes = {
  count: PropTypes.number
}

export default SkeletonProduct;