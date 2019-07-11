import React from "react";
import PopularProduct from "../PopularProduct";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../Skeleton";


const PopularProducts = props => {
  const { data } = props;
  let counter = 0;
  if ((!data || data.length < 1) && props.maxProductCount) {
    for (var i = 0; i < props.maxProductCount; i++) {
      data.push({
        id: undefined,
        image: {},
        name: undefined,
        price: undefined
      });
    }
  }
  return (
    <div>
      <h2 style={{
        marginLeft: 48,
        fontSize: 30,
        marginTop: 64,
        marginBottom: 0
      }}>
        {strings.most_searched}
      </h2>
      <Row
        type="flex"
        justify="center"
        style={{
          marginBottom: 48,
        }}>
        {data.map((product, index) => {
          if (props.maxProductCount && counter <props.maxProductCount) {
            if (props.maxProductCount !== null) {
              counter += 1;
            }
            return (
              <React.Fragment key={index}>
                {data.length < 1 ?
                  (<SkeletonCustom
                    count={4}
                    height={300}
                    leftMargin={13}
                    rightMargin={13}
                  />) : (
                    <React.Fragment>
                      <Col style={{ margin: "0 20px" }} key={index}>
                        <PopularProduct
                          key={product.id}
                          price={product.price}
                          urlImage={product.image.smallUrl}
                          name={product.name}
                          id={product.id}
                          product={product}
                        />
                      </Col>
                    </React.Fragment>
                  )}
              </React.Fragment>
            );
          }
          if (!props.maxProductCount) {
            return (
              <React.Fragment>
                  {data.length < 1 ?
                    (<SkeletonCustom
                      count={4}
                      height={300}
                      leftMargin={13}
                      rightMargin={13}
                    />) : (
                      <React.Fragment>
                        <Col style={{ margin: "18px" }} key={index}>
                          <PopularProduct
                            key={product.id}
                            price={product.price}
                            urlImage={product.image.smallUrl}
                            name={product.name}
                            id={product.id}
                            product={product}
                          />
                        </Col>
                      </React.Fragment>
                    )}
              </React.Fragment>
            )
          }
        })}
      </Row>
    </div>
  )
};

export default PopularProducts;
