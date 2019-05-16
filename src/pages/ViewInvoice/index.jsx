import React, { Component } from 'react';
import { PATH_ORDER } from "../../api/path";
import { apiGetWithToken } from "../../api/services";
import TableInvoicePayment from '../../components/InvoiceDetailDashboard/TableInvoicePayment';
import ReactToPrint from 'react-to-print';
import TableInvoiceDetailDashboard from '../../components/InvoiceDetailDashboard/TableInvoiceDetail';
import "./style.sass";
import { Col, Row, Icon, Button } from 'antd';
import currencyRupiah from '../../library/currency';
import logoMonggoPesen from "../../assets/img/logo_monggopesen/logo_monggopesen_large.png";
import Background from "../../assets/img/ic_background/ic_bg_info_pembayaran.png";
import strings from '../../localization/localization';



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
        return <Button size={"large"}>Cetak<Icon type="printer" /></Button>;
    };

    render() {
        const filterNote = this.state.indexes.map(index => index.note);
        const filterTotalAmount = this.state.indexes.map(index => index.totalAmount);
        return (
            <React.Fragment>
                <div ref={el => (this.componentRef = el)}>
                    <div className="container viewInvoice">
                        <div className="viewInvoice__header">
                            <div>
                                <img
                                    style={{
                                        maxWidth: 250,
                                        maxHeight: 50
                                    }}
                                    src={logoMonggoPesen}
                                    alt="login__logo"
                                />
                            </div>
                            <div style={{marginTop: -10}}>
                                <h2>No.&nbsp;<font style={{ color: "#007E80" }}>{
                                    this.state.invoiceNumber}</font>
                                </h2>
                            </div>

                        </div>
                        <h2 className="viewInvoice__heading">Bukti Pembayaran</h2>
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginBottom: 15
                            }
                            }>
                            <p>Hai Ahyar Afal I, <br />
                                {strings.text_thanks_invoice}.</p>
                            <ReactToPrint
                                trigger={this.renderButton}
                                content={() => this.componentRef}
                                copyStyles={true}
                                bodyClass="reactPrint"
                                pageStyle="reactPrint"
                                closeAfterPrint={false}
                            />
                        </div>
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
                        <div className="viewInvoice__contentPayment">
                            <div className="totalInvoicePayment" style={{ backgroundImage: "url(" + Background + ")" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h3 style={{ display: "unset" }}>TOTAL </h3>
                                    <p className="totalInvoicePayment__total">{currencyRupiah(filterTotalAmount)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default ViewInvoice;