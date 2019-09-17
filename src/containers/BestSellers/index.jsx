import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../../components/Skeleton";
import Product from "../../repository/Product";
import Cards from "../../components/Cards";
import { PATH_PRODUCT } from "../../services/path/product";
import { Link } from "react-router-dom";

export default function BestSellers(props) {
  const [bestseller, setBestSeller] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getBestSeller();
  }, []);

  async function getBestSeller() {
    let bestSeller = await Product.getBestSeller({
      loading: setLoading
    });
    if (bestSeller.status === 200) {
      setBestSeller(bestSeller.products);
    } else {
      setBestSeller([]);
    }
  }

  return (
    <div className="mp-best-seller-wrapper">
      <Row>
        <Col md={4}>
          <div className="mp-best-seller-wrapper__box">
            <span className="mp-best-seller-wrapper__font-one">
              {strings.best}
            </span>
            <span className="mp-best-seller-wrapper__font-two">
              {strings.seller}
            </span>
          </div>
        </Col>
        <Col md={20}>
          {loading ? (
            <div className="mp-best-seller-wrapper__right-item">
              <SkeletonCustom
                count={3}
                height={300}
                width={200}
                topMargin={64}
                rightMargin={70}
              />
            </div>
          ) : (
            <div className="mp-best-seller-wrapper__right-item-content">
              {bestseller.map((product, index) => {
              return (
                <React.Fragment key={index}>
                  <Col style={{ margin: "12px", width: "200px" }}>
                    <Link to={`${PATH_PRODUCT.PRODUCT}/${product.id} `|| "#"}>
                      <Cards
                        type='best-seller'
                        title={product.name}
                        urlImage={product.thumbnail}
                        price={product.price}
                        showPlayButton={product.isVideoExist}
                      />
                    </Link>
                  </Col>
                </React.Fragment>
              );
              })}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
