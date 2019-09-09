import React, {  useState, useEffect } from "react";
import "./style.sass"
import ErrorPage from "../../components/ConfirmationError"
import ConfirmationPage from '../../components/Confirmation'
import Customer from "../../repository/Customer";


export default function Confirmation(props) {
  const [activated, setActivated] = useState(false)
  const idConfirmation = props.match.params.idConfirmation

  useEffect(() => {
    const params = idConfirmation
    requestActivation(params);
  }, [])

  async function requestActivation(params) {
    let activated = await Customer.activated({
      params: params
    })
    if (activated.status === 200) {
      setActivated(true)
    } else {
      setActivated(false)
    }
  }

  return (
    <React.Fragment>
      {activated ?
        <ConfirmationPage /> :
        <ErrorPage />
      }
    </React.Fragment>

  )

}

