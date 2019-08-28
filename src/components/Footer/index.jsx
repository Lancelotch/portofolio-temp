import React, { Component } from "react";
import { Row, Col, notification, Form } from "antd";
import { Link } from "react-router-dom";
import category from "../../api/services/category";
import "./style.sass";
import strings from "../../localization/localization";
import ovo from "../../assets/img/ic_ovo.png";
import bca from "../../assets/img/ic_bca.png";
import mandiri from "../../assets/img/ic_mandiri.png";
import dana from "../../assets/img/ic_dana.png";
import visa from "../../assets/img/ic_visa-mastercard.png";
import instagram from "../../assets/img/ic_instagram.png";
import twitter from "../../assets/img/ic_twitter.png";
import facebook from "../../assets/img/ic_facebook.png";
import monggopesen_logo_large from "../../assets/img/logo_monggopesen/logo_monggopesen_large.png";
import { rulesEmail } from "../../pages/Register/registerContainer";
import Input from "../Input";

const FormItem = Form.Item;

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      subsResponse: "",
      showNotification: false
    };
  }

  componentDidMount() {
    // this.handleSubmit();
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = e => {
    // e.preventDefault();
    const { validateFields, resetFields } = this.props.form;
    validateFields(async (err, values) => {
      if (!err) {
        try {
          const response = await category.subscription({
            email: values.email
          });
          this.setState({
            SubsResponse: response.data,
            showNotification: !this.state.showNotification
          });
          this.openNotification();
          resetFields();
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  openNotification = async () => {
    const { SubsResponse, showNotification } = this.state;
    if (SubsResponse === true && showNotification === true) {
      notification.success({
        message: "Selamat",
        description: "sekarang kamu bisa dapetin update dari kita",
        // icon: <Icon type="smile" style={{ color: "#108ee9" }} />
        // icon: <Icon type="check-circle" />
      });
    } else {
      return null;
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <React.Fragment>
        <div className="backgroundFooter">
          <div className="container">
            <Row>
              <div className="footer__all-col">
                <Col md={14}>
                  <div className="footer__left-col">
                    <div>
                      <p className="footer__help">
                        <b>{strings.footer_any_help}</b>
                      </p>
                      <div className="footer__menu-col">
                        <Col span={12}>
                          <div>
                            <p>
                              <Link to="/">{strings.how_to_shop}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.delivery_time}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.how_to_pay}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.track_the_delivery}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.contact_us}</Link>
                            </p>
                          </div>
                        </Col>
                        <Col span={12}>
                          <div>
                            <p>
                              <Link to="/">{strings.about_us}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.career}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.terms_and_condition}</Link>
                            </p>
                            <p>
                              <Link to="/">{strings.privacy_policy}</Link>
                            </p>
                          </div>
                        </Col>
                      </div>
                    </div>
                    <div>
                      <Col span={24}>
                        <div className="footer__payment-box">
                          <p>{strings.payment}</p>
                          <div className="footer__icon-box">
                            <img src={ovo} alt="ovo" />
                            <img src={bca} alt="bca" />
                            <img src={mandiri} alt="mandiri" />
                            <img src={dana} alt="dana" />
                            <img src={visa} alt="visa" />
                          </div>
                        </div>
                      </Col>
                    </div>
                  </div>
                </Col>
                <Col md={10}>
                  <div className="footer__right-col">
                    <p className="footer__monggo">
                      <b>{strings.monggo}</b>
                    </p>
                    <Col md={24}>
                      <div className="footer__invitation">
                        <p>{strings.subscripton_invitation}</p>

                        <Form onSubmit={this.handleSubmit}>
                          <Row>
                            <Col md={24}>
                              <FormItem>
                                {getFieldDecorator("email", rulesEmail())(
                                  <Input
                                    placeholder="Email"
                                    icon="mail"
                                    size="xlarge"
                                    buttontext="Send"
                                    onClick={this.handleSubmit}
                                  />
                                )}
                              </FormItem>
                            </Col>
                          </Row>
                        </Form>
                      </div>
                    </Col>
                    <Col md={24}>
                      <div className="footer__follow-us">
                        <p>{strings.follow_us}</p>
                        <div className="footer__icon-box">
                          <img src={instagram} alt="instagram" />
                          <img src={twitter} alt="twitter" />
                          <img src={facebook} alt="facebook" />
                        </div>
                      </div>
                    </Col>
                  </div>
                </Col>
              </div>
            </Row>
          </div>
        </div>
        <div className="logo-bottom">
          <div>
            <img src={monggopesen_logo_large} alt="" />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const FooterForm = Form.create({})(Footer);
export default FooterForm;
