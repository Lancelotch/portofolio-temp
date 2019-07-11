import React, { Component } from 'react';
import { PATH_INVOICE } from "../../api/path";
import { apiGetWithToken } from "../../api/services";
import TableInvoicePayment from '../../components/InvoiceDetailDashboard/TableInvoicePayment';
import ReactToPrint from 'react-to-print';
import TableInvoiceDetailDashboard from '../../components/InvoiceDetailDashboard/TableInvoiceDetail';
import "./style.sass";
import { Icon, Button } from 'antd';
import currencyRupiah from '../../library/currency';
import logoMonggoPesen from "../../assets/img/logo_monggopesen/logo_monggopesen_large.png";
import Background from "../../assets/img/ic_background/ic_bg_info_pembayaran.png";
import strings from '../../localization/localization';



class ViewInvoice extends Component {
    constructor(props) {
        super(props);
        this.state = {
            order: {},
            id: "",
            invoiceNumber: ""
        }
    }

    componentDidMount() {
        this.viewInvoiceDetailsDashboard();
    };


    viewInvoiceDetailsDashboard = async () => {
        const invoiceId = this.props.match.params.invoiceId;
        try {
            const response = await apiGetWithToken(PATH_INVOICE.INVOICE_DRAFT_BY_ID + invoiceId);
            console.log(response);

            const itemInvoiceDashboard = {
                id: response.data.data.id,
                order: response.data.data.order,
                invoiceNumber: response.data.data.invoiceNumber,
            };
            this.setState({
                ...itemInvoiceDashboard
            });
        } catch (error) {
            console.log(error);
        }
    };

    componentDidUpdate() {
        document.title = 'Invoice Customer'
    }


    renderButton = () => {
        return <Button size={"large"}>Cetak<Icon type="printer" /></Button>;
    };

    render() {
        const filterNote = this.state.order.orderItems && this.state.order.orderItems.map(items => items.note);
        return (
            <React.Fragment>
                <div ref={el => (this.componentRef = el)}>
                    <div className="container viewInvoice">
                        <div className="viewInvoice__header">
                            <div>
                                <img style={{
                                    maxWidth: 250,
                                    maxHeight: 50
                                }}
                                    src={logoMonggoPesen}
                                    alt="login__logo"
                                />
                            </div>
                            <div style={{ marginTop: -10 }}>
                                <h2>No.&nbsp;<font style={{ color: "#007E80" }}>{
                                    this.state.invoiceNumber}</font>
                                </h2>
                            </div>

                        </div>
                        <h2 className="viewInvoice__heading">Bukti Pembayaran</h2>
                        <div style={{
                            display: "flex",
                            justifyContent: "space-between",
                            marginBottom: 15
                        }}>
                        {this.state.order.customer &&
                            <p>Hai { this.state.order.customer.name}
                        , <br />
                                {strings.text_thanks_invoice}.</p>}
                            <ReactToPrint
                                trigger={this.renderButton}
                                content={() => this.componentRef}
                                copyStyles={true}
                                bodyClass="reactPrint"
                                pageStyle="reactPrint"
                                closeAfterPrint={false}
                            />
                        </div>

                        {this.state.order.customer &&
                            <TableInvoiceDetailDashboard
                                customerOrder={this.state.order.customer}
                                note={filterNote}
                                customerOrderAddress={this.state.order.orderAddress}
                                orderDate={this.state.order.orderActivityDate}
                                invoice={this.state.invoiceNumber}
                            />
                        }
                        {this.state.order.courier && this.state.order.orderItems && this.state.order.orderItems.map((items, i) =>
                            <TableInvoicePayment
                                key={i}
                                productSnapshot={items.productSnapshot}
                                shipment={items.shipment} 
                                courier={this.state.order.courier}     
                            />
                        )}
                        <div className="viewInvoice__contentPayment">
                            <div className="totalInvoicePayment" style={{ backgroundImage: "url(" + Background + ")" }}>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <h3 style={{ display: "unset" }}>TOTAL </h3>
                                    <p className="totalInvoicePayment__total">{currencyRupiah(this.state.order.amount)}</p>
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