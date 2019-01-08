import React from 'react';
import { Skeleton } from 'react-js-skeleton';

const skeleton = props => {
  return (
    <Skeleton count={props.count || 1} />
  );
};

export default skeleton;
