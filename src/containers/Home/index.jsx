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
      <Row>
        <Col xs={24} md={24}>
          <SliderHome />
          <Row type="flex" justify="center">
            <Benefit />
          </Row>
          <PopularProducts />
          <Col md={24}>
            <BestSellers />
          </Col>
          <Link to='/'>
            <img className='inspiration-box' src={Inspiration_1} alt="" />
          </Link>
          <div className="recomendation-box">
            <h2 style={{ marginLeft: 48, fontSize: 30 }}>
              {strings.recommendation_product}
            </h2>
            <Row type="flex" justify="center">
              <div
                style={{
                  marginBottom: 20,
                  width: 1130,
                }}
              >
                <Recommend />
              </div>
            </Row>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}

