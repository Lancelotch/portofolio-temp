import React, { Component } from "react";
import { Col, Row, Button } from "antd";
import { connect } from "react-redux";
import { activatingUser } from "../../store/actions/authentication";
import "../../sass/style.sass";
import logo from "../../assets/img/monggopesen_logo.png"
import ilustration from "../../assets/img/ic_background/illustration_pesenajadulu.png"
import "./style.sass"

class ConfirmationEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailConfirmed: false
    };
  }

  componentDidMount() {
    const idConfirmation = this.props.match.params.idConfirmation;
    this.requestActivation(idConfirmation);
  }

  requestActivation = async (idConfirmation) =>{
    try{
      const response = await this.props.activatingUser(idConfirmation)
    }catch(error){
      console.log(error);
    }
  }

  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <div className="container">
          <div className="container__wrap">
            <div className="container__logo">
              <img src={logo} alt=""/>
            </div>
            <div className="container__box">
              <Row>
                <Col span={12}>
                  <Row>
                    <Col span={24}>
                      <div className="container__head">
                        Hi, Smart People
                      </div>
                    </Col>
                    <br/>
                    <Col span={24}>
                      <div className="container__content">
                        <p>
                        Selamat ya, akun kamu sudah terverifikasi oleh sistem kami,
                        terimakasih sudah melakukan registrasi di monggopesen,
                        kita punya semua produk luar negri yang kamu mau
                        tinggal pesen, kita antar sampai rumah kamu.
                        </p>
                      </div>
                    </Col>
                    <Col span={24}>
                      <div className="container__foot">
                      <p>
                      Hati-hati jangan berikan informasi akun monggopesen anda kepada siapapun.
                      </p>
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col span={12} >
                  <div className="container__image">
                  <img src={ilustration} alt=""/>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button className="container__button color-button"><div className="container__textButton">Mulai Belanja</div></Button>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(
  mapStateToProps,
  { activatingUser }
)(ConfirmationEmail);
