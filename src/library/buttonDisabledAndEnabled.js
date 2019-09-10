import React from "react";
import Button from "../components/Button";
import strings from "../localization/localization";



export const buttonDisabledandEnabledDelivery = (status, actionReceivedConfirm, productOrderRespon, keyIndex, id) => {
  return <Button
    size="large"
    marginright="small"
    type={status === "SHP" || status === "RCP" ? "grey" : "primary"}
    disabled={status === "SHP" || status === "RCP" ? true : false}
    onClick={() => actionReceivedConfirm(productOrderRespon, keyIndex, id)}>
    {strings.order_received}
  </Button>;
}