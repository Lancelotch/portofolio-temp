import React, { Component } from "react";
import HomePageContainer from "../../containers/Home";
import ModalSuccess from "../../modal/ModalRegisterSuccess";
import { connect } from "react-redux";
import { openModal } from "../../store/actions/authentication";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      benefit: [],
      popularProduct: [],
      bestSellerProduct: [],
      mostClickProduct: [],
      modalStatus: false,
      textButton: "Mulai Belanja"
    };
  }
  render() {
    const { match } = this.props;
    console.log("ini home", this.props);
    return (
      <React.Fragment>
        <HomePageContainer match={match} />
        {this.props.message && (
          <ModalSuccess
            textButton={this.state.textButton}
            modalStatus={this.props.statusModal}
            email={this.props.message.email}
          />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => {
  const { statusModal, message } = state.authentication;
  return {
    statusModal,
    message
  };
};

export default connect(
  mapStateToProps,
  { openModal }
)(HomePage);
