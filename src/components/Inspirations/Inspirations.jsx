import React from "react";
import { Row } from "antd";
import Inspiration from "./Inspiration";

const Inspirations = props => {
  return (
    <Row>
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
  );
};

export default Inspirations;
