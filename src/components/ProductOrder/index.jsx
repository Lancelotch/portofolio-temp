import React from "react";
import { Row, Col } from "antd";
import "./style.sass";
import strings from "../../localization/localization";
// import currencyRupiah from "../../library/currency";

const ProductOrder = props => {
  const {indexes} = props;
  indexes.sort((a, b) => a - b);
  return (
        <div className="productOrder">
          {indexes.map((index,i) =>
            <Row key={i}>
              <Col md={3} style={{ paddingLeft: 32, paddingRight: 72 }}>
                <img
                  className="productOrder__image"
                  src={index.productImage}
                  alt=""
                />
              </Col>
              <Col md={21}>
                <h2> {index.productName} </h2>
                <p className="productOrder__variant" style={{ marginBottom: 10 }}>
                  {strings.varian}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;
             {index.variants[0].name.charAt(0).toUpperCase() +
                    index.variants[0].name.substring(1)}&nbsp;
             {index.variants[0].value},&nbsp;
             {index.variants[1].name.charAt(0).toUpperCase() +
                    index.variants[1].name.substring(1)}
                  {index.variants[1].value}
                </p>
              
                  <p className="productOrder__variant">{strings.note}&nbsp;&nbsp;:&nbsp;
                  {index.note && index.note.charAt(0).toUpperCase() + index.note.substring(1)}</p>
                
                <p className="productOrder__quantity">
                  {strings.total}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;{index.productQuantity} pcs
          </p>
              </Col>
              {/*<Col md={5} style={{ marginTop: 60 }}>
        <p className="productOrder__totalPrice">
           {currencyRupiah(index.totalAmount)} x {index.productQuantity}
             </p>
        </Col>*/}
            </Row>
          )}
        </div>
  );
};

export default ProductOrder;
