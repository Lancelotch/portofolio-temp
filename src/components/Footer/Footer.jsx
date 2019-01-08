import React, { Component } from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./style.sass";

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
                    <Col md={4}>
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
                    </Col>
                    <Col md={16}>
                    <hr className="footer__line-left"></hr>
                    <img src={require("assets/img/footer/monggopesen-footer.png")} />
                    <li className="footer__icon-text">
                      <a to="#">
                        Monggo Pesen
                      </a>
                    </li>
                    <ul className="footer__benefits-wrapper">
                    <li className="footer__benefits">
                    Privacy Policy
                    </li>
                    <li className="footer__benefits">
                    Term and Conditions
                    </li>
                    <li className="footer__benefits">
                    How to Deals
                    </li>
                    </ul>
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
