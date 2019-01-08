import React, { Component } from "react";
import { Input, Icon } from "antd";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./style.sass";

const Search = Input.Search;

class Footer extends Component {
  render() {
    return (
      <React.Fragment>
        <div className="container-fluid">
          <Row>
            <Col md={24}>
              <div className="footer">
                <div className="container">
                  <Row>
                    <Col md={7}>
                      <ul className="footer__typography">
                        <li>
                          <Link to="#">About us</Link>
                        </li>
                        <li>
                          <Link to="#">Careers</Link>
                        </li>
                        <li>
                          <Link to="#">Affailate Program</Link>
                        </li>
                        <li>
                          <Link to="#">Bussiness with us</Link>
                        </li>
                        <li>
                          <Link to="#">Join to Reseller</Link>
                        </li>
                      </ul>
                      <hr className="footer__line-left" />
                    </Col>
                    <Col md={10}>
                      <img
                        src={require("assets/img/footer/monggopesen-footer.png")}
                      />
                      <li className="footer__icon-text">
                        <a to="#">Monggo Pesen</a>
                      </li>
                      <ul className="footer__benefits-wrapper">
                        <li className="footer__benefits">
                        Privacy Policy
                        </li>
                        <li className="footer__benefits">
                          Term and Conditions
                        </li>
                        <li className="footer__benefits">
                        How to Deals</li>
                      </ul>
                      <Search
                        placeholder="input search text"
                        enterButton="Subscribe"
                        size="large"
                        onSearch={value => console.log(value)}
                      />
                      <div className="footer-icon-social">
                        <Icon type="facebook" />
                        <Icon type="instagram" />
                        <Icon type="linkedin" />
                        <Icon type="twitter" />
                      </div>
                      <Col md={24}>
                        <p className="footer-company">
                          &copy; PT. Giyarto Manunggal Sejati
                        </p>
                      </Col>
                    </Col>
                    <Col md={7}>
                      <hr className="footer__line-right" />
                      <Col md={24} offset={12}>
                        <ul className="footer__typography-right">
                          <li>
                            <Link to="#">Help</Link>
                          </li>
                          <li>
                            <Link to="#">Contact Us</Link>
                          </li>
                          <li>
                            <Link to="#">Track Orders</Link>
                          </li>
                          <li>
                            <Link to="#">Faq</Link>
                          </li>
                          <li>
                            <Link to="#">Shipping Terms</Link>
                          </li>
                        </ul>
                      </Col>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </React.Fragment>
    );
  }
}

export default Footer;
