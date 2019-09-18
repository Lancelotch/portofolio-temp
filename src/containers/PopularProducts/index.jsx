import React, { useState, useEffect } from "react";
import "./style.sass";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../../components/Skeleton";
import Product from "../../repository/Product";
import Cards from "../../components/Cards";
import { PATH_PRODUCT } from "../../services/path/product";
import { Link } from "react-router-dom";

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
      setPopularProducts(productPopular.products);
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
                  <Col style={{ margin: "20px" }}>
                    <Link to={`${PATH_PRODUCT.PRODUCT}/${product.id} ` || "#"}>
                      <Cards
                        type="popular"
                        title={product.name}
                        urlImage={product.thumbnail}
                        price={product.price}
                      />
                    </Link>
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
