import React from "react";
import { Row } from "antd";
import SliderHome from "../../components/SliderHome";
import Benefit from "../../components/Benefit";
import BestSellers from "../BestSellers";
import PopularProducts from "../PopularProducts";
import Recommend from "../../components/Recommend";
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
        <div
          className="full-width"
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Recommend />
        </div>
      </div>
    </React.Fragment>
  );
}
