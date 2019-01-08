import React from 'react';
import { SkeletonImg } from 'react-js-skeleton';

const skeletonImg = props => {
  return (
    <SkeletonImg
      heightSkeleton={props.heightSkeleton}
      widthSkeleton={props.widthSkeleton}
    />
  );
};

export default skeletonImg;
