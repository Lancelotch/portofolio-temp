import React from "react";
import "./style.sass";
import strings from "../../localization/localization";
import { Card, Row, Col, Button, Divider, Checkbox, Icon, Popover } from "antd";
import currencyRupiah from "../../library/currency";

const OrderSummary = props => {
  const { quantity, shipment, priceProduct, checked, handleChecked, total, shipmentFee,priceJne } = props;

  const totalQuantityProduct = priceProduct * quantity
  const totalProduct = totalQuantityProduct

  const totalAmount = amountTotal => {
    return currencyRupiah(amountTotal)
  };


  return (
    <Card title={strings.order_summary} className="card__Style">
      <Row className="card__Content">
        <Col md={12}>
          <div className="price-pcs">
            <p>{"Harga Product"}</p>
            <p>{`Pcs`}</p>
          </div>
          <div className="sub-total">
            <p>{"Sub Total"}</p>
          </div>
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
        <Col md={12} className="card__ColumnLeft">
          <div className="price-pcs">
            <p className="price">{currencyRupiah(priceProduct)}</p>
            <p>{`x ${quantity}`}</p>
          </div>
          <div className="sub-total">
            <p>{totalAmount(totalProduct)}</p>
          </div>
          <div className="shipping-price">
            <p className="p-color-teal">
              {shipment === "sea"
                ? "Ongkir Sudah Termasuk"
                : currencyRupiah(shipmentFee.difference)}
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
      <Row className="rowUnderDivider">
        <Col md={12}>
          <b>{strings.real_total}</b>
        </Col>
        <Col md={12} className="card__ColumnLeft">
          <b className="price">{currencyRupiah(total)}</b>
        </Col>
        <Col md={24}>
          <div className="ordersummary">
            <Button className="card__Button" onClick={props.onOrder}>
              {strings.choose_payment_methods}
            </Button>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default OrderSummary;
