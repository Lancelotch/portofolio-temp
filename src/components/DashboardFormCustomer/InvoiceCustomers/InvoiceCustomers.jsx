import React, { Component } from 'react';
import PropTypes from 'prop-types';
import serviceInvoice from '../../../api/services/ServiceInvoice'
import InvoiceCustomer from './InvoiceCustomer';

class InvoiceCustomers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoices : []
        }

    }

    componentDidMount() {
        this.loadInvoice()
    }

    loadInvoice() {
        serviceInvoice.apiGetInvoice()
            .then(response => {
                const invoices = response.data
                this.setState({
                    invoices: invoices
                })
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const {invoices} = this.state
        return (
            <div>
                {invoices.map(invoice => {
                    const createDate = new Date(invoice.createDate).toLocaleString(
                        undefined, {
                            day: 'numeric',
                            month: 'numeric',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                    )
                    return (
                        <InvoiceCustomer 
                        key= {invoice.id}
                        id= {invoice.id}
                        invoiceNumber={invoice.invoiceNumber}
                        createDate={createDate}
                        totalAmount={invoice.totalAmount}
                        paymentStatus={invoice.paymentStatus}
                        indexes={invoice.indexes}
                        />
                    )
                })}

            </div>
        );
    }
}


export default InvoiceCustomers;