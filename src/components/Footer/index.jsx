import React from "react";
import { Row, Col, Form } from "antd";
import { Link } from "react-router-dom";
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
import Input from "../Input";
import { Formik } from "formik";
import { schema } from "./schema";
import Subscription from "../../repository/Subscription";
import notification from "../../library/notification";

function Footer() {

  async function handleSubmitSubscribe(email) {
    const subscription = await Subscription.add({
      email: email
    })
    if (subscription.status === 200) {
      notification(
        "Selamat",
        "sekarang kamu bisa dapetin update dari kita.",
        "success"
      )
    }
  };

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
                      <Row>
                        <Col md={24}>
                          <Formik
                            onSubmit={(values, {resetForm}) => {
                              handleSubmitSubscribe(values);
                              resetForm({});
                            }}
                            validationSchema={schema}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit
                            }) => (
                                  <Form.Item validateStatus={errors.email && "error"} help={errors.email}>
                                    <Input
                                      name="email"
                                      value={values.email}
                                      placeholder="Email"
                                      icon="mail"
                                      size="large"
                                      buttontext="Send"
                                      onButtonClick={handleSubmit}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                    />
                                  </Form.Item>
                              )}
                          </Formik>
                        </Col>
                      </Row>
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

export default Footer;


