import React, { Component } from 'react';
import { PATH_ORDER } from "../../api/path";
import { apiGetWithToken } from "../../api/services";
import convertTimesTime from '../../library/convertTimestime';
import ReactToPrint from 'react-to-print';

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
        console.log('AAAAAAAAAAA', this.state.bank.name);

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
                    {this.state.invoiceNumber}
                    {convertTimesTime.millisecond(this.state.orderDate)}
                </div>
            </React.Fragment>
        );
    }
}

export default ViewInvoice;