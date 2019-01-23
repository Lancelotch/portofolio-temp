import React from 'react';
import Loadable from 'react-loading-overlay';

const loadable = props => {
  return (
    <Loadable
      active={props.active}
      spinner={props.spinner || true}
      text={props.text || 'Loading'}
    >
    {props.children}
    </Loadable>
  );
};

export default loadable;
