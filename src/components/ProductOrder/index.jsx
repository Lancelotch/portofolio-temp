import React, { Fragment } from "react";
import { Row, Col } from "antd";
import "./style.sass";
import TableProductOrder from "../TableProductOrder";
import { Link } from "react-router-dom";
import Button from "../Button"
import strings from "../../localization/localization";
import PATH_URL from "../../routers/path";


const ProductOrder = props => {
  const { orderItems, productId, showOrderDetailsDashboard } = props;

  return (
    <div className="product-order">
      {orderItems !== undefined | orderItems ?
        <Row key={"i"}>
          {orderItems.map((order, index) => {
            return (
              <Fragment key={index}>
                <Col md={2}>
                  <img
                    className="product-order__image"
                    src={order.productSnapshot.image.largeUrl}
                    alt=""
                  />
                </Col>
                <Col md={19}>
                  <div className="product-order__variant">
                    <h2> {order.productSnapshot.name}</h2>
                    <TableProductOrder
                      informations={order.productSnapshot.informations}
                      quantity={order.productSnapshot.quantity}
                      note={order.note}
                    />
                  </div>
                </Col>
                <Col md={3}>
                  {showOrderDetailsDashboard ===
                    "isShowOrderDetailsDashboardFinish" &&
                    <div className="product-order__buy-again">
                      <Link to={`${PATH_URL.PRODUCTS}/${productId} ` || "#"}>
                        <Button
                          type="primary"
                          size="large">
                          {strings.buy_again}
                        </Button>
                      </Link>
                    </div>}
                </Col>
              </Fragment>
            )
          })}
        </Row>
        : ""}
    </div>
  );
};

export default ProductOrder;