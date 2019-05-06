import React from 'react';
import Skeleton from "react-loading-skeleton";
import { Row, Col } from "antd";
import PropTypes from 'prop-types';

const loopSkeleton = count => {
  let skeletons = [];
  for (let i = 0; i <= count; i++) {
    skeletons.push(
      <Col span={4} key={i} style={{ marginLeft: 15 }}>
        <Skeleton height={250} width={200} />
        <Skeleton count={2} width={200} />
      </Col>
    );
  }
  return skeletons;
};

const SkeletonProduct = props => {
  const count = props.count;
  return (
    <React.Fragment>
      <Row align="middle" justify="center">
        {/* <LoopSkeleton count={count} /> */}
        {loopSkeleton(count)}
      </Row>
    </React.Fragment>
  );
};

SkeletonProduct.propTypes = {
  count: PropTypes.number
}

export default SkeletonProduct;