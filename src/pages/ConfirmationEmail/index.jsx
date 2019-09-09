import React, { Component, useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { activatingUser } from "../../store/actions/authentication";
import "./style.sass"
import customer from "../../services/path/customer"
import history from "../../routers/history"
import ErrorPage from "../../components/ConfirmationError"
import ConfirmationPage from '../../components/Confirmation'


function ConfirmationEmail(props) {
  const [isEmailConfirmed, setIsEmailConfirmed] = useState(false)
  const [customerName, setCustomerName] = useState("")


  useEffect(() => {
    const idConfirmation = props.match.params.idConfirmation;
    requestActivation(idConfirmation);
    // this.getCustomerName()
  }, [])

  async function requestActivation(idConfirmation) {
    try {
      const response = await props.activatingUser(idConfirmation)
      console.log(response);
    } catch (error) {
      console.log("error from confirmation page");
    }
  }

  function toHome () {
    history.push("/")
  }




  getCustomerName = async () => {
    try {
      const dataCostumer = await customer.customerDetail()
      const name = dataCostumer.data.name
      this.setState({
        customerName: name
      })
    } catch (error) {
      console.log(error)
    }
  }

    return (
      <div>
        {this.props.activated ? <ConfirmationPage /> : <ErrorPage />}
      </div>
    );
  }

const mapStateToProps = state => ({
  isAuthenticated: state.authentication.isAuthenticated,
  activated: state.authentication.activated
});

export default connect(
  mapStateToProps,
  { activatingUser }
)(ConfirmationEmail);
