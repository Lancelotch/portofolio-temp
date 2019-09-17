import React, { useState, useEffect } from "react";
import "./style.sass";
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
    <div className="mp-popular-products">
      <span className="mp-popular-products__title">
        {strings.most_searched}
      </span>
      <Row type="flex">
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
                  <Col style={{margin: 20}}>
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
    </div>
  );
}
