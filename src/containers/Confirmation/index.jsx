import React, { Component } from "react";
import Header from "../../components/Header";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import {activatingUser} from '../../store/actions/authentication';
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
    this.props.activatingUser(idConfirmation);
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
  isAuthenticated: state.authentication.isAuthenticated
});

export default connect(mapStateToProps,{activatingUser})(ConfirmationEmail);
