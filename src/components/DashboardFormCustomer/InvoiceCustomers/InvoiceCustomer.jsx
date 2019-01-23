import React from 'react'
import {Row, Col} from 'antd'
import './style.sass'

const InvoiceCustomer = props => {
  return(
    <div>
      <div className='customerInvoice'>
        <Row>
          <Col xs={{ span: 5}} md={{ span: 6 }}>
            <div>
              <h4>No. Invoice</h4>
              <span style={{
                color: "#414345",
                display: "unset",
                fontWeight: "500",
                fontSize: "13px"
              }}>
                {props.invoiceNumber}
              </span>
            </div>

          </Col>
        </Row>
      </div>
    </div>
  )
}

export default InvoiceCustomer;
