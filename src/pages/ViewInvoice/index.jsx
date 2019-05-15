import React, { Component } from 'react';
import { PATH_ORDER } from "../../api/path";
import { apiGetWithToken } from "../../api/services";
import TableInvoicePayment from '../../components/InvoiceDetailDashboard/TableInvoicePayment';
import ReactToPrint from 'react-to-print';
import TableInvoiceDetailDashboard from '../../components/InvoiceDetailDashboard/TableInvoiceDetail';

class ViewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productorder: {},
            payment: {},
            shipping: {},
            bank: {},
            address: {},
            indexes: [],
            id: "",
            endDatePay: 0,
            invoiceNumber: "",
            estimateShippingDate: "",
            orderDate: 0,
        }
    }

    componentDidMount() {
        this.viewInvoiceDetailsDashboard();
    };


    viewInvoiceDetailsDashboard = async () => {
        const invoiceId = this.props.match.params.invoiceId;
        try {
            const response = await apiGetWithToken(PATH_ORDER.ORDER_BY_ID + invoiceId);
            const itemInvoiceDashboard = {
                id: response.data.data.id,
                invoiceNumber: response.data.data.invoiceNumber,
                estimateShippingDate: response.data.data.estimateShippingDate,
                bank: response.data.data.bank,
                endDatePay: response.data.data.endDatePay,
                shipping: response.data.data.shipping,
                payment: response.data.data.payment,
                productorder: response.data.data,
                address: response.data.data.address,
                indexes: response.data.data.indexes,
                orderDate: response.data.data.orderDate
            };
            this.setState({
                ...itemInvoiceDashboard
            });
        } catch (error) {
            console.log(error);
        }
    };


    renderButton = () => {
        return <button color="primary">Print</button>;
    };

    render() {
       const filterNote = this.state.indexes.map(index=> index.note);
        return (
            <React.Fragment>
                <ReactToPrint
                    trigger={this.renderButton}
                    content={() => this.componentRef}
                />
                <div ref={el => (this.componentRef = el)} className="container">
                    <h2>Bukti Pembayaran</h2>
                    <p>Hai Ahyar Afal I,

                    Terimakasih sudah berbelanja di monggopesen.com, ini adalah bukti dari transaksi anda.</p>
                    <TableInvoiceDetailDashboard
                    note={filterNote}
                        address={this.state.address}
                        orderDate={this.state.orderDate}
                        invoice={this.state.invoiceNumber}
                    />
                    {this.state.indexes.map(index =>
                        <TableInvoicePayment 
                        productName={index.productName} 
                        variants={index.variants}
                        productQuantity={index.productQuantity}
                        totalAmount={index.totalAmount}
                        shipping={this.state.shipping}
                         />
                    )}
                </div>
            </React.Fragment>
        );
    }
}

export default ViewInvoice;