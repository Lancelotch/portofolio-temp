import React, { useState, useEffect } from "react";
import { Col, Row } from "antd";
import BestSeller from "../../components/BestSeller";
import strings from "../../localization/localization";
import SkeletonCustom from "../../components/Skeleton";
import Product from "../../repository/Product";

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
      setBestSeller(bestSeller.data.data);
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
              {bestseller.map((product, i) => {
                return <BestSeller id={product.id} key={i} product={product} />;
              })}
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
