import React, { Component } from 'react'
import { Modal, Button, Row, Col, Collapse } from 'antd'
import InvoiceCustomers from '../InvoiceCustomers/InvoiceCustomers'
import SidebarCustomer from '../../SidebarCustomer/SidebarCustomer'
import DashboardCustomer from '../../../containers/Dashboard/Dashboard'
import serviceInvoice from '../../../api/services/ServiceInvoice'
import { apiGetAddressDefault } from '../../../api/services/ServiceAddress'
import convertTimesTime from '../../../config/convertTimestime'
import ItemInvoiceDetail from './ItemInvoiceDetail'
import CurrencyRp from '../../Typography/CurrencyRp'
import DeliveryProgress from './DeliveryProgress'

const Panel = Collapse.Panel

class InvoiceCustomerDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoice: {},
      isDataInvoiceLoaded: false,
      addressReceiver: {},
      showDeliveryProgress: false
    }
  }

  componentDidMount () {
    this.loadInvoiceId()
  }

  loadInvoiceId () {
    serviceInvoice.apiGetInvoiceById(this.props.invoiceId).then(response => {
      const invoice = response.data
      this.getAddress()
      this.setState({
        invoice: invoice,
        isDataInvoiceLoaded: true
      })
      console.log(invoice)
    })
  }

  getAddress = () => {
    apiGetAddressDefault()
      .then(result => {
        const customerAddressDefault = result.data
        this.setState({ addressReceiver: customerAddressDefault })
      })
      .catch(error => {
        console.log(error)
      })
  }

  onShowClick = () => {
    this.setState({
      showDeliveryProgress: !this.state.showDeliveryProgress
    })
  }

  render () {
    const { visible, onCancel } = this.props
    let totalCostCourier = 0
    let totalCostProduct = 0
    let totalInvoice = 0
    const responseInvoiceDetail = {
      marginTop: '8px',
      height: '50px',
      color: '#9B9B9B',
      border: '1px solid #E5E4E4',
      borderRadius: '6px',
      backgroundColor: '#FFF6EF'
    }
    return (
      <React.Fragment>
        <Modal
          visible={visible}
          closable={false}
          footer={null}
          onCancel={onCancel}
          width={700}
          height={700}
          style={{top: 60 ,overflow:'auto', borderRadius:'3px'}}
          title='Detail Transaksi'
        >
          <Row>
            <Col xs={{ span: 10 }} md={{ span: 10 }}>
              <div
              // style={{
              //   background: '#E0F2F1',
              //   marginBottom: '20px',
              //   padding: '16px',
              //   borderRadius: '0px'
              // }}
              >
                <h4>No. Invoice</h4>
                <p style={{ color: '#007E80' }}>
                  {this.state.invoice.invoiceNumber}
                </p>
                <h4>Tanggal Pembayaran</h4>
                <p style={{ color: '#007E80' }}>
                  {convertTimesTime.millisecond(this.state.invoice.paymentDate)}
                </p>
                <h4>Status Pembayaran</h4>
                <p style={{ color: '#f63700' }}>
                  {this.state.invoice.paymentStatus}
                </p>
                <h4>Metode Pembayaran</h4>
                <p style={{ color: '#007E80' }}>
                  {this.state.invoice.paymentMethod}
                </p>
              </div>
            </Col>
            <Col xs={{ span: 14 }} md={{ span: 14 }}>
              <div style={{ borderLeft: '1px solid #EEEEEE' }}>
                <div style={{ marginLeft: '16px' }}>
                  <p style={{ color: '#007E80' }}>
                    {' '}
                    {`Ditemima oleh: ${
                      this.state.addressReceiver.receiverName
                    }`}{' '}
                  </p>
                  <b>
                    <p>
                      {this.state.addressReceiver.labelName +
                        ', ' +
                        this.state.addressReceiver.fullAddress +
                        ', ' +
                        this.state.addressReceiver.city}
                    </p>
                    <p>
                      {this.state.addressReceiver.province +
                        ', ' +
                        this.state.addressReceiver.zipcode}
                    </p>
                    <p>
                      {`No. Telephone: ${
                        this.state.addressReceiver.phoneNumber
                      }`}
                    </p>
                  </b>
                </div>
              </div>
            </Col>
          </Row>
          {this.state.isDataInvoiceLoaded !== false ? (
            this.state.invoice.indexes.map(index => {
              totalCostCourier = totalCostCourier + index.courier.cost
              totalCostProduct =
                totalCostProduct + index.quantity * index.idrPrice
              totalInvoice = totalCostCourier + totalCostProduct
              return (
                <div style={{ borderTop: '1px solid #EEEEEE' }}>
                  <Row
                    key={index.indexNumber}
                    className='transaksi-detail-invoice'
                    style={{ marginTop: '20px', marginBottom: '20px' }}
                  >
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <h4>
                        No. Index -
                        <span
                          style={{
                            color: 'rgb(74, 144, 226)',
                            display: 'unset',
                            fontWeight: '500'
                          }}
                        >
                          {index.indexNumber}
                        </span>
                      </h4>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <ItemInvoiceDetail
                        title={index.name}
                        imageUrl={index.image}
                        price={index.idrPrice}
                        item={index.quantity}
                        variants={index.variants}
                        noted={index.notes}
                        courier={index.courier}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <p
                        style={{
                          color: '#9B9B9B',
                          display: 'unset',
                          fontSize: '13px'
                        }}
                      >
                        Harga ( {index.quantity} x{' '}
                        <CurrencyRp price={index.idrPrice} />)
                      </p>
                      <b style={{ fontSize: '13px', float: 'right' }}>
                        <CurrencyRp price={index.quantity * index.idrPrice} />
                      </b>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <p
                        style={{
                          color: '#9B9B9B',
                          display: 'unset',
                          fontSize: '13px'
                        }}
                      >
                        Ongkos Kirim
                      </p>
                      <b style={{ fontSize: '13px', float: 'right' }}>
                        <CurrencyRp price={index.courier.cost} />
                      </b>
                    </Col>
                    <Col xs={{ span: 24 }} md={{ span: 24 }}>
                      <p
                        style={{
                          color: '#9B9B9B',
                          display: 'unset',
                          fontSize: '14px'
                        }}
                      >
                        Sub Total
                      </p>
                      <b style={{ fontSize: '15px', float: 'right' }}>
                        <CurrencyRp
                          price={
                            index.quantity * index.idrPrice + index.courier.cost
                          }
                        />
                      </b>
                    </Col>
                    <Row>
                      <Col xs={{ span: 24 }} md={{ span: 24 }}>
                        <b
                          style={{
                            cursor: 'pointer',
                            float: 'left',
                            color: '#007E80'
                          }}
                          onClick={this.onShowClick}
                        >
                          {this.state.showDeliveryProgress === false ? (
                            <p> Cek Status Pengiriman</p>
                          ) : (
                            <p style={{ color: 'red' }}>Tutup</p>
                          )}
                        </b>
                      </Col>
                      {this.state.showDeliveryProgress ? (
                        <DeliveryProgress />
                      ) : null}
                    </Row>
                  </Row>
                </div>
              )
            })
          ) : (
            <div />
          )}
        </Modal>
      </React.Fragment>
    )
  }
}

export default InvoiceCustomerDetail
