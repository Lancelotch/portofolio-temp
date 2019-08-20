import React from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Card, Row, Col, Divider, Checkbox, Icon, Popover } from "antd";
import currencyRupiah from "../../library/currency";
import Button from "../Button/AllButton";

const OrderSummary = props => {
  const { quantity, shipment, priceProduct, checked, handleChecked, total, shipmentFee, priceJne } = props;
  let checkPriceJne = priceJne === 0 ? true : false
  const totalQuantityProduct = priceProduct * quantity
  const totalProduct = totalQuantityProduct

  const totalPriceShipping = quantity * shipmentFee

  const totalAmount = amountTotal => {
    return currencyRupiah(amountTotal)
  };



  return (
    <Card title={strings.order_summary} className="mp-order-summary">
      <Row>
        <Col md={12}>
          <div className="price-pcs">
            <p>{"Harga Product"}</p>
            {/*<p>{`Pcs`}</p>*/}
          </div>
          {/* <div className="sub-total">
            <p>{"Sub Total"}</p>
          </div>*/}
          <div className="international-shipping">
            <p>Pengiriman International</p>
            <p className="p-color-teal">{shipment === "sea"
              ? "Laut"
              : "Udara"}</p>
          </div>
          <div className="lokal-shipping">
            <p>Pengiriman Lokal</p>
            <p className="p-color-teal">JNE REG</p>
          </div>
          <div className="jne-assurance">
            <Checkbox
              checked={checked}
              onClick={handleChecked}
              className={checked ? "jne-checkbox-true" : "jne-checkbox"}
            >
              <span>Asuransi JNE </span>
              <Popover
                content={
                  <div style={{ maxWidth: "305px" }}>
                    <p>
                      Penambahan asuransi sangat disarankan untuk menjaga produk
                      barang pesanan Anda dari kerusakan / kehilangan selama
                      pengiriman kurir lokal (JNE). Monggopesen tidak
                      bertanggung jawab atas kerusakan / kehilangan barang
                      selama pengiriman kurir lokal (JNE) apabila Anda tidak
                      mengasuransikan barang yang Anda pesan.
                    </p>
                  </div>
                }
                title="Tentang Asuransi JNE"
                trigger="click"
              >
                <Icon type="info-circle" style={{ color: "#FB6900" }} />
              </Popover>
            </Checkbox>
          </div>
        </Col>
        <Col md={12} className="mp-order-summary__column-left">
          <div className="price-pcs">
            <p className="price">{totalAmount(totalProduct)}</p>
            { /*<p>{`x ${quantity}`}</p>*/}
          </div>
          {/*<div className="sub-total">
            <p>{currencyRupiah(priceProduct)}</p>
            </div>*/}
          <div className="shipping-price">
            <p className="p-color-teal">
              {shipment === "sea"
                ? "Ongkir Sudah Termasuk"
                : currencyRupiah(totalPriceShipping)}
            </p>
          </div>
          <div className="shipping-price">
            <p className="p-color-teal">{currencyRupiah(priceJne)}</p>
          </div>
          <div className={checked ? "jne-price-true" : "jne-price"}>
            <p>Rp. 9.936</p>
          </div>
        </Col>
      </Row>
      <Divider className="divider-checkout" />
      <Row className="mp-order-summary-row-under-divider">
        <Col md={12}>
          <b>{strings.real_total}</b>
        </Col>
        <Col md={12} className="mp-order-summary__column-left">
          <b className="price">{currencyRupiah(total)}</b>
        </Col>
        <Col md={24}>
          <div className="mp-order-summary-button">
            <Button
              disabled={checkPriceJne}
              type="primary"
              width="full"
              margin="small"
              onClick={props.onOrder}>
              {strings.choose_payment_methods}
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderSummary;
