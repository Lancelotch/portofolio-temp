import React, { Component } from "react";
import Header from "../../components/Header/Header";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import {activationCustomer} from '../../store/actions/auth';
import "../../sass/style.sass";

class ConfirmationEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailConfirmed: false
    };
  }

  componentDidMount() {
    const idConfirmation = this.props.match.params.idConfirmation;
    console.log(idConfirmation);
    this.props.activationCustomer(idConfirmation);
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div className="container">
          <div className="container__first-item">
            <Row>
              <Col>
                <p>Email has been Confirmed!!</p>
              </Col>
            </Row>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps,{activationCustomer})(ConfirmationEmail);
