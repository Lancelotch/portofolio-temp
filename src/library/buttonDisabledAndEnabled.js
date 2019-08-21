import React from "react";
import Button from "../components/Button";



export const buttonDisabledandEnabledDelivery = (status, actionReceivedConfirm, productOrderRespon, keyIndex, id) => {
  return <Button size="large" marginright="small" type={status === "SHP" || status === "RCP" ? "disabled" : "primary"} disabled={status === "SHP" || status === "RCP" ? true : false}
    onClick={() => actionReceivedConfirm(productOrderRespon, keyIndex, id)}>
    Pesanan Diterima
  </Button>;
}