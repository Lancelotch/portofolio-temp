import React from "react";
import { Col, Row } from "antd";
<<<<<<< HEAD
import "./style.sass";


const Shippings = props => {
  const { shipping } = props;
  return (
    <React.Fragment>
      {shipping.length > 0 ? (
        <div className="container-row-shipping">
          <div className="shipping" style={{ marginRight: 25 }}>
          <Col md={24}>
              <Col md={12}>
              <p style={{fontSize:18}}>{shipping[1].via}</p>
              {shipping[1].estimation.substring(8)}<br/>
              Harga sudah termasuk
              </Col>
              <Col md={12}>{shipping[0].via}<br/>
              {shipping[0].estimation.substring(9)}<br/>
              Rp. {shipping[0].price}</Col>
              </Col>
          </div>
        </div>
      ) : null}
=======
import './style.sass';
const Shippings = props => {
  const { shipping } = props;    
  return (
    <React.Fragment>  
      {
        shipping.length > 0 ? (
          <div className="container-row-shipping">            
              <div className="shipping" style={{ marginRight: 25 }}>                
                <Col md={24}>
                  <p>{shipping[1].estimation}</p>
                  Harga sudah termasuk
                </Col>
              </div>            
              <div className="shipping">                
                <Col md={24}>
                  <p>{shipping[0].estimation}</p>
                  Rp. {shipping[0].price}
                </Col>
              </div>            
          </div>      
        ) : null
      }          
>>>>>>> de7b486bbd3d63e8bda3d5dd89dbc2bcc3760809
    </React.Fragment>
  );
};

export default Shippings;
