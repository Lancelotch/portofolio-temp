import React from "react";
import PopularProduct from "../PopularProduct";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../Skeleton";


const PopularProducts = props => {
  const { data } = props;
  return (
    <div style={{ marginTop: 33 }}>
      <h2 style={{
        marginLeft: 48,
        fontSize: 30
      }}>
        {strings.most_searched}
      </h2>
      <Row
        type="flex"
        justify="center"
        style={{
          marginTop: 24,
          marginBottom: 24,
        }}>
        {data.length < 1 ? 
          (<SkeletonCustom 
          count={4} 
          height={300} 
          leftMargin={13} 
          rightMargin={13} 
          />) : (
          <React.Fragment>
            {data.map((product, index) => {
              return (
                <Col style={{ margin: "18px" }} key={index}>
                  <PopularProduct key={product.id} product={product} />
                </Col>
              );
            })}
          </React.Fragment>
        )}
      </Row>
    </div>
  )
};

export default PopularProducts;
