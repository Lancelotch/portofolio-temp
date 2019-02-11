import React, { Component } from 'react'
import PropTypes from 'prop-types'
import serviceInvoice from '../../../api/services/ServiceInvoice'
import InvoiceCustomer from './InvoiceCustomer'

class InvoiceCustomers extends Component {
  constructor (props) {
    super(props)
    this.state = {
      invoices: [],
      viewDetail: this.props.viewDetail
    }
  }

  componentDidMount () {
    this.loadInvoice()
  }

  loadInvoice () {
    serviceInvoice
      .apiGetInvoice()
      .then(response => {
        this.setState({
          invoices: response.data
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render () {
    const { invoices, viewDetail} = this.state
    return (
      <div>
        {invoices.map(invoice => {
          return (
            <InvoiceCustomer
              key={invoice.id}
              id={invoice.id}
              invoiceNumber={invoice.invoiceNumber}
              paymentDate={invoice.paymentDate}
              totalAmount={invoice.totalAmount}
              paymentStatus={invoice.paymentStatus}
              indexes={invoice.indexes}
              viewDetail={viewDetail}
            />
          )
        })}
      </div>
    )
  }
}

export default InvoiceCustomers
