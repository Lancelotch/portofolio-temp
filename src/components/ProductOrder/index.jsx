import React, { Fragment } from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
import variantItems from "../../library/variantItems";
// import currencyRupiah from "../../library/currency";


const ProductOrder = props => {
  const { orderItems } = props;

  return (
    <div className="productOrder">
      {orderItems !== undefined | orderItems ?
        <Row key={"i"}>
          {orderItems.map((order, index) => {
            return (
              <Fragment key={index}>
                <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
                  <img
                    className="productOrder__image"
                    src={order.productSnapshot.image.largeUrl}
                    alt=""
                  />
                </Col>
                <Col md={21}>
                  <h2> {order.productSnapshot.name}</h2>
                  <div className="productOrder__variant">
                    <table>
                      <tbody>
                        <tr>
                          <td style={{ width: 70 }}>
                            <p>
                              {strings.varian}
                            </p>
                          </td>
                          <td style={{ width: 20 }}>
                            <p>
                              :
                        </p>
                          </td>
                          <td>
                            <p>
                              {variantItems(order.productSnapshot.informations)}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: 70, verticalAlign: "unset" }}>
                            <p>
                              {strings.note}
                            </p>
                          </td>
                          <td style={{ verticalAlign: "unset", width: 20 }}>
                            <p>
                              :
                         </p>
                          </td>
                          <td>
                            <p>
                              {order.note}
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style={{ width: 70 }}>
                            <p className="productOrder__quantity">
                              {strings.total}
                            </p>
                          </td>
                          <td style={{ width: 20 }}>
                            <p>
                              :
                        </p>
                          </td>
                          <td>
                            <p className="productOrder__quantity">
                              {order.productSnapshot.quantity}&nbsp;{strings.pcs}
                            </p>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
                {/*<Col md={5} style={{ marginTop: 60 }}>
                      <p className="productOrder__totalPrice">
                         {currencyRupiah(0.totalAmount)} x {0.productQuantity}
                           </p>
                      </Col>*/}
              </Fragment>
            )
          })}
        </Row>
        : ""}
    </div>
  );
};

export default ProductOrder;