import React, { useState, useEffect, useRef } from 'react';
import TableInvoicePayment from '../../components/InvoiceDetailDashboard/TableInvoicePayment';
import ReactToPrint from 'react-to-print';
import TableInvoiceDetailDashboard from '../../components/InvoiceDetailDashboard/TableInvoiceDetail';
import "./style.sass";
import { Icon, Button } from 'antd';
import currencyRupiah from '../../library/currency';
import logoMonggoPesen from "../../assets/img/logo_monggopesen/logo_monggopesen_large.png";
import Background from "../../assets/img/ic_background/ic_bg_info_pembayaran.png";
import strings from '../../localization/localization';
import Invoice from '../../repository/Invoice'

export default function ViewInvoice (props) {
    const [order, setOrder] = useState ({})
    const [id, setId] = useState('')
    const [invoiceNumber, setInvoiceNumber] = useState('')
    const [filterNote , setFilterNote] = useState({})
    const componentRef = useRef();

    useEffect(() => {
        viewInvoiceDetailsDashboard()
        const filter = order.orderItems && order.orderItems.map(items => items.note);
        setFilterNote(filter)
    },[])

    async function viewInvoiceDetailsDashboard () {
        const invoiceId = props.match.params.invoiceId;
        const response = await Invoice.get({params : invoiceId})
        if(response.status === 200){
            setInvoiceNumber(response.data.data.invoiceNumber)
            setOrder(response.data.data.order)
            setId(response.data.data.id)
        }else{

        }
    };
    const renderButton = () => {
        return <Button size={"large"}>Cetak<Icon type="printer" /></Button>;
    };
    
    return (
        <React.Fragment>
            <div ref={el => (componentRef.current = el)}>
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
                                invoiceNumber}</font>
                            </h2>
                        </div>

                    </div>
                    <h2 className="viewInvoice__heading">Bukti Pembayaran</h2>
                    <div style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 15
                    }}>
                    {order.customer &&
                        <p>Hai { order.customer.name}
                    , <br />
                            {strings.text_thanks_invoice}.</p>}
                        <ReactToPrint
                            trigger={renderButton}
                            content={() => componentRef.current}
                            copyStyles={true}
                            bodyClass="reactPrint"
                            pageStyle="reactPrint"
                            closeAfterPrint={false}
                        />
                    </div>

                    {order.customer &&
                        <TableInvoiceDetailDashboard
                            customerOrder={order.customer}
                            note={filterNote}
                            customerOrderAddress={order.orderAddress}
                            orderDate={order.orderActivityDate}
                            invoice={invoiceNumber}
                        />
                    }
                    {order.courier && order.orderItems && order.orderItems.map((items, i) =>
                        <TableInvoicePayment
                            key={i}
                            productSnapshot={items.productSnapshot}
                            shipment={items.shipment} 
                            courier={order.courier}     
                        />
                    )}
                    <div className="viewInvoice__contentPayment">
                        <div className="totalInvoicePayment" style={{ backgroundImage: "url(" + Background + ")" }}>
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <h3 style={{ display: "unset" }}>TOTAL </h3>
                                <p className="totalInvoicePayment__total">{currencyRupiah(order.amount)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}