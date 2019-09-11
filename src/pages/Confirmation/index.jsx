import React, {  useState, useEffect } from "react";
import "./style.sass"
import ConfirmationPage from '../../components/Confirmation'
import Customer from "../../repository/Customer";
import Error from "../Error";


export default function Confirmation(props) {
  const [activated, setActivated] = useState(false)
  const idActivated = props.match.params.idConfirmation

  useEffect(() => {
    const params = idActivated
    doActivated(params);
  }, [])

  async function doActivated(idActivated) {
    let activated = await Customer.activated({
      idActivated: idActivated
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
        <Error />
      }
    </React.Fragment>

  )

}

