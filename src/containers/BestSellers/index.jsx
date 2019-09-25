import React, { useState, useEffect } from "react";
import "./style.sass";
import { Col, Row } from "antd";
import strings from "../../localization/localization";
import SkeletonCustom from "../../components/Skeleton";
import Product from "../../repository/Product";
import Cards from "../../components/Cards";
import PATH_URL from "../../routers/path";
import { Link } from "react-router-dom";
import Button from "../../components/Button";

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
    <div className="mp-best-seller">
      <Row>
        <Col md={4}>
          <div className="mp-best-seller__box-string">
            <span className="mp-best-seller__best-string">{strings.best}</span>
            <span className="mp-best-seller__best-string">
              {strings.seller}
            </span>
          </div>
          <div className="mp-best-seller__box-button">
            <Link to="/products">
              <Button type="primary">See more</Button>
            </Link>
          </div>
        </Col>
        <Col md={20}>
          {loading ? (
            <div className="mp-best-seller__right-item">
              <SkeletonCustom
                count={3}
                height={300}
                width={200}
                topMargin={64}
                rightMargin={70}
              />
            </div>
          ) : (
            <div className="mp-best-seller__right-item-content">
              {bestseller.map((product, index) => {
                return (
                  <React.Fragment key={index}>
                    <Col style={{ margin: "12px" }}>
                      <Link
                        to={`${PATH_URL.PRODUCTS}/${product.id} ` || "#"}
                      >
                        <Cards
                          type="best-seller"
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
