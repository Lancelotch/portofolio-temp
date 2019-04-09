import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import currencyRupiah from "../../library/currency";

const ProductOrder = props => {
  const { productorder } = props;
  console.log("proudct-order", productorder);

  return (
    <React.Fragment>
      {productorder.map((order, id) => (
        <div className="productOrder">
          <Row>
            <Col md={2}>
              <img
                className="productOrder__image"
                src={order.variants[0].imageUrl}
                alt=""
              />
            </Col>
            <Col md={17}>
              <h2>{order.productName}</h2>
              <p className="productOrder__variant">
                Varian : Warna : {order.variants[0].value},&nbsp;Size:{" "}
                {order.variants[1].value}
              </p>
              <p className="productOrder__quantity">Jumlah :{" "}{order.productQuantity}</p>
            </Col>
            <Col md={5} style={{ marginTop: 60 }}>
              <p className="productOrder__totalPrice">{currencyRupiah(order.totalAmount)}</p>
            </Col>
          </Row>
        </div>
      ))}
    </React.Fragment>
  );
};

export default ProductOrder;
