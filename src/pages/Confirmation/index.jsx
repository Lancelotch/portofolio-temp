import React, { Component } from "react";
import { connect } from "react-redux";
import { activatingUser } from "../../store/actions/authentication";
import "../../sass/style.sass";
import "./style.sass"
import customer from "../../api/services/customer"
import history from "../../routers/history"
import ErrorPage from "../../components/ConfirmationError"
import ConfirmationPage from '../../components/Confirmation'


class ConfirmationEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailConfirmed: false,
      customerName: ""
    };
  }

  componentDidMount() {
    const idConfirmation = this.props.match.params.idConfirmation;
    this.requestActivation(idConfirmation);
    // this.getCustomerName()
  }

  requestActivation = async (idConfirmation) =>{
    try{
      const response = await this.props.activatingUser(idConfirmation)
    }catch(error){
      console.log("error from confirmation page");
    }
  }

  toHome = () => {
    history.push("/")
  }

  getCustomerName = async() => {
    try{
      const dataCostumer = await customer.customerDetail()
      const name = dataCostumer.data.name
      this.setState({
        customerName : name
      })
    }catch(error){
      console.log(error)
    }
  }

  render() {
    return (
        <div>
          {this.props.activated ? <ConfirmationPage/> : <ErrorPage/>}
        </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  activated: state.authentication.activated
});

export default connect(
  mapStateToProps,
  { activatingUser }
)(ConfirmationEmail);
