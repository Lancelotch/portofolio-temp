import React, { Component } from "react";
import { Row, Col, Slider, Button } from "antd";
import { connect } from "react-redux";
import SliderHome from "../../components/SliderHome";
import category from "../../api/services/category";
import Benefit from "../../components/Benefit";
import product from "../../api/services/product";
import BestSeller from "../../components/BestSellers";
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
    const {
      benefit,
      popularProduct,
      bestSellerProduct,
      mostClickProduct
    } = this.props;
    console.log(mostClickProduct);

    return (
      <React.Fragment>
        <Row>
          <Col xs={24} md={24}>
            <SliderHome />
            <Row type="flex" justify="center">
              <Benefit />
            </Row>
            <div>
              <h1 style={{ marginLeft: "48px" }}>{strings.most_searched}</h1>
              <Row
                type="flex"
                justify="center"
                style={{ marginBottom: "24px" }}
              >
                <Fetcher path={PATH_PRODUCT.PRODUCT_BY_ID}>
                  <PopularProducts {...this.props} maxNumber={4} />
                </Fetcher>
              </Row>
            </div>
            <Row>
              <Col>
                <div className="bestSellerBackground ">
                  <Row>
                    <Col md={3}>
                      <div className="best__box">
                        <span className="best__fontOne">{strings.best}</span>
                        <span className="best__fontTwo">{strings.seller}</span>
                        <button className="best__button">{strings.see_more}</button>
                      </div>
                    </Col>
                    <Col md={20}>
                      <div style={{ paddingLeft: "120px" }}>
                        <BestSeller
                          products={bestSellerProduct}
                          maxNumber={4}
                        />
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
            <Row>
              <Link to="/">
                <img className="inspiration-box" src={Inspiration_1} />
              </Link>
            </Row>
            <div>
              <h1 style={{ marginTop: "80px",marginLeft: "48px" }}>Rekomendasi Produk</h1>
              <Row type="flex" justify="center">
                <div
                  style={{
                    marginBottom: "30px",
                    width: "92%",
                    marginLeft: "40px",
                    marginRight: "40px"
                  }}
                >
                  <ClickProducts products={mostClickProduct} />
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
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps)(HomePageContainer);
