import React from "react";
import { Col, Row } from "antd";
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
    </React.Fragment>
  );
};

export default Shippings;
