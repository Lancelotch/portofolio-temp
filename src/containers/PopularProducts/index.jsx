import React, { useState, useEffect } from "react";
import PopularProduct from "../../components/PopularProduct";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../../components/Skeleton";
import Product from "../../repository/Product";

export default function PopularProducts(props) {
  const [popularProducts, setPopularProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProductPopular();
  }, []);

  async function getProductPopular() {
    let productPopular = await Product.getPopular({
      loading: setLoading
    });
    if (productPopular.status === 200) {
      setPopularProducts(productPopular.data.data);
    } else {
      setPopularProducts(null);
    }
  }

  return (
    <React.Fragment>
      <h2 className="mp-popular-products-heading">{strings.most_searched}</h2>
      <Row type="flex" justify="center" style={{marginBottom: 24}}>
        <React.Fragment>
          {loading ? (
            <SkeletonCustom
              count={3}
              height={300}
              leftMargin={13}
              rightMargin={13}
            />
          ) : (
            popularProducts &&
            popularProducts.map((product, index) => {
              return (
                <React.Fragment key={index}>
                  <Col style={{ margin: "0 20px" }}>
                    <PopularProduct
                      key={product.id}
                      price={product.price}
                      urlImage={product.image && product.image.defaultImage}
                      name={product.name}
                      id={product.id}
                      product={product}
                    />
                  </Col>
                </React.Fragment>
              );
            })
          )}
        </React.Fragment>
      </Row>
    </React.Fragment>
  );
}
