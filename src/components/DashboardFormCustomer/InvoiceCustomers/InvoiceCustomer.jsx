import React, { Component } from 'react'
import { Row, Col, Button, Modal } from 'antd'
import './style.sass'
import CurrencyRp from '../../Typography/CurrencyRp'
import { Link } from 'react-router-dom'
import convertTimesTime from '../../../config/convertTimestime'
import InvoiceCustomerDetail from '../InvoiceCustomerDetail/InvoiceCustomerDetail'

class InvoiceCustomer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      modalInvoice: false
    }
  }

  modalInvoice = () => {
    this.setState({
      modalInvoice: !this.state.modalInvoice
    })
  }

  render () {
    const props = this.props
    return (
      <div>
        <div
          style={{
            background: '#FAFAFA',
            marginBottom: '20px',
            padding: '16px',
            borderRadius: '8px'
          }}
        >
          <Row type='flex' justify='start'>
            <Col xs={{ span: 5 }} md={{ span: 6 }}>
              <div>
                <h4>No. Invoice</h4>
                <span
                  style={{
                    color: '#414345',
                    display: 'unset',
                    fontWeight: '500',
                    fontSize: '13px'
                  }}
                >
                  {props.invoiceNumber}
                </span>
              </div>
            </Col>
            <Col xs={{ span: 5 }} md={{ span: 6 }}>
              <div
                container
                direction='column'
                justify='center'
                alignItems='center'
              >
                <h4>Tanggal Pemesanan</h4>
                <span
                  style={{
                    color: '#FFA122',
                    display: 'unset',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  {convertTimesTime.millisecond(props.paymentDate)}
                </span>
              </div>
            </Col>
            <Col xs={{ span: 5 }} md={{ span: 6 }}>
              <div>
                <h4>Total Pesanan</h4>
                <span
                  style={{
                    color: '#FFA122',
                    display: 'unset',
                    fontWeight: 'bold',
                    fontSize: '14px'
                  }}
                >
                  {' '}
                  <CurrencyRp price={props.totalAmount} />
                </span>
              </div>
            </Col>
            <Col>
              <div>
                <h4 justifiy='flex=start' className='waiting-price'>
                  {props.paymentStatus}
                </h4>
                <div>
                  <Button onClick={this.modalInvoice} justButtonInvoice>
                    Lihat Invoice
                  </Button>
                  <InvoiceCustomerDetail
                    visible={this.state.modalInvoice}
                    onCancel={this.modalInvoice}
                    invoiceId= {props.id}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
}

export default InvoiceCustomer
