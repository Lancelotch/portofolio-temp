import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import SliderHome from "../../components/SliderHome";
// import category from "../../api/services/category";
import Benefit from "../../components/Benefit";
// import product from "../../api/services/product";
import BestSellers from "../BestSellers";
import PopularProducts from "../PopularProducts";
import Inspiration_1 from "../../assets/img/Inspiration_1.jpg";
import ClickProducts from "../../components/ClickProducts";
import { Link } from "react-router-dom";
import "./style.sass";
import strings from "../../localization/localization";

class HomePageContainer extends Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <SliderHome />
            <Row type="flex" justify="center">
              <Benefit />
            </Row>
              <PopularProducts/>
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
                    <ClickProducts  />
                </div>
              </Row>
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  checkError: state.authentication.checkError
});

export default connect(mapStateToProps)(HomePageContainer);
