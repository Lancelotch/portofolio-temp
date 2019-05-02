import React, { Component } from "react";
import Header from "../../components/Header";
import { Col, Row } from "antd";
import { connect } from "react-redux";
import { activatingUser } from "../../store/actions/authentication";
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
    this.requestActivation(idConfirmation);
  }

  requestActivation = async (idConfirmation) =>{
    try{
      // const response = await this.props.activatingUser(idConfirmation);
    }catch(error){
      console.log(error);
    }
  }

  render() {
    const {match} = this.props;
    return (
      <React.Fragment>
        <Header match={match}/>
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

export default connect(
  mapStateToProps,
  { activatingUser }
)(ConfirmationEmail);
