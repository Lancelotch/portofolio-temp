import React from "react";
import { Row } from "antd";
import Inspiration from "./Inspiration";

const Inspirations = props => {
  return (
    <div className="container-fluid">
    <Row type="flex" justify="center">
        {props.inspirations.map(inspiration => {
          return (
            <Inspiration
              key={inspiration.id}
              id={inspiration.id}
              url={inspiration.type}
              imageUrl={inspiration.imageUrl}
            />
          );
        })}
    </Row>
    </div>
  );
};

export default Inspirations;
