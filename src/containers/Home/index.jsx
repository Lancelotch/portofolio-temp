import React from "react";
import { Row, Col } from "antd";
import SliderHome from "../../components/SliderHome";
import Benefit from "../../components/Benefit";
import BestSellers from "../BestSellers";
import PopularProducts from "../PopularProducts";
import Inspiration_1 from "../../assets/img/Inspiration_1.jpg";
import Recommend from "../../components/Recommend";
import { Link } from "react-router-dom";
import "./style.sass";
import strings from "../../localization/localization";

export default function Home() {
  return (
    <React.Fragment>
      <SliderHome />
      <Row type="flex" justify="center">
        <Benefit />
      </Row>
      <PopularProducts />
      <BestSellers />
      <div className="recomendation-box">
        <span style={{ fontSize: 16, fontWeight: 500 }}>
          {strings.recommendation_product}
        </span>
        <Row type="flex" justify="center">
          <div
            style={{
              marginTop: 20,
              marginBottom: 20,
              width: 1130
            }}
          >
            <Recommend />
          </div>
        </Row>
      </div>
    </React.Fragment>
  );
}
