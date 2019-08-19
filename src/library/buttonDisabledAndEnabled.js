import React from "react";
import { Button } from "antd";


export const buttonDisabledandEnabledDelivery = (status, actionReceivedConfirm, productOrderRespon, keyIndex, id) => {
  return <Button size="large" disabled={status === "SHP" || status === "RCP" ? true : false}
    onClick={() => actionReceivedConfirm(productOrderRespon, keyIndex, id)}
    className={status === "SHP" || status === "RCP" ? "default " : "waiting-payment__pay-now"}>
    Pesanan Diterima
  </Button>;
}