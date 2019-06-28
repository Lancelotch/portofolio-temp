import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import SliderHome from "../../components/SliderHome";
// import category from "../../api/services/category";
import Benefit from "../../components/Benefit";
// import product from "../../api/services/product";
import BestSellers from "../../components/BestSellers/index";
import PopularProducts from "../../components/PopularProducts";
import Inspiration_1 from "../../assets/img/Inspiration_1.jpg";
import ClickProducts from "../../components/ClickProducts";
import { Link } from "react-router-dom";
import "./style.sass";
import strings from "../../localization/localization";
import Fetcher from "../../components/Fetcher";
import { PATH_PRODUCT } from "../../api/path";



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
            <Fetcher path={PATH_PRODUCT.PRODUCT_ALL_DRAFT}>
              <PopularProducts {...this.props} maxProductCount={4} />
            </Fetcher>
            <Col md={24}>
              <Fetcher path={PATH_PRODUCT.PRODUCT_BEST_SELLER}>
                <BestSellers {...this.props} maxNumber={4}></BestSellers>
              </Fetcher>
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
                  <Fetcher path={PATH_PRODUCT.PRODUCT_RECOMMENDATION}>
                    <ClickProducts {...this.props} />
                  </Fetcher>
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
