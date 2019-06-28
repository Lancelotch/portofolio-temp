import React, { Component } from 'react';
import OrderStatusCancel from "../../components/OrderStatusCancel";
import ProductOrderDetails from "../../components/ProductOrderDetails";
import { apiGetWithToken } from '../../api/services';
import { PATH_ORDER } from '../../api/path';
import { Affix, Icon, Button } from 'antd';
import PaymentInfo from '../../components/PaymentInfo';
import OrderStatusUser from '../../components/OrderStatusUser';

class OrderDetailsCancel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShowOrderDetailsCancel: false,
            indexes: [],
            orderDate: null,
            cancelBy: null,
            cancelDate: null,
            orderId: this.props.orderId,
            address: {
                "labelName": "Rumah Laela Tercinta",
                "receiverName": "Candra Darmawan",
                "phoneNumber": "085695492329",
                "provinceId": "6",
                "province": "DKI Jakarta",
                "subdistrictId": "2095",
                "subdistrict": "Cempaka Putih",
                "cityId": "152",
                "city": "Jakarta Pusat",
                "zipcode": "17530",
                "fullAddress": "dimana2 sebrang mesjid"
            },
            payment: {
                "transactionTime": "2019-05-29T02:31:01.000+0000",
                "transactionStatus": "pending",
                "statusMessage": "midtrans payment notification",
                "paymentType": "bank_transfer",
                "orderId": "b9b58e64-184c-44fc-8118-21f3fd8f10f4",
                "grossAmount": 14240000,
                "currency": "IDR",
                "virtualAccount": "208006436187014",
                "bankName": "PERMATA"
            },
            shipping: {
                "via": "Laut"
            },
            expedisi: {
                "type": "JNE REG",
                "expedisiPrice": 14240000
            }


        }
    }

    componentDidMount() {
        this.productOrderDetailDashboard();
    }



    productOrderDetailDashboard = async () => {
        const orderId = this.state.orderId;
        try {
            const response = await apiGetWithToken(PATH_ORDER.ORDER_BY_ID + orderId);
            const itemProductOrderCancel = {
                cancelDate: response.data.data.cancelDate,
                indexes: response.data.data.indexes,
                orderDate: response.data.data.orderDate,
                cancelBy: response.data.data.cancelBy
            };
            this.setState({
                ...itemProductOrderCancel
            });
        } catch (error) {
            console.log(error);
        }
    };

    render() {
        return (
            <React.Fragment>
                {this.state.indexes.map((order, i) => {
                    return (
                        <React.Fragment key={i}>
                            <div
                                style={{
                                    marginLeft: 15,
                                    display: "flex",
                                    justifyContent: "space-between"
                                }}>
                                <h2
                                    style={{
                                        color: "#4A4A4A",
                                        fontSize: 24
                                    }}>
                                    Batal
                                </h2>
                                <Affix offsetTop={170}>
                                    <div className="buttonOrderDetails">
                                    <Button
                                        onClick={() => this.props.actionShowOrderListWaiting()}>
                                        <Icon type="arrow-left" /> &nbsp;
                                        Kembali
                                    </Button>
                                    </div>
                                </Affix>
                            </div>
                            <OrderStatusCancel
                                cancelBy={this.state.cancelBy}
                                actionShowOrderListWaiting={this.props.actionShowOrderListWaiting}
                                orderDate={this.state.orderDate} />
                            <div key={order.productId} style={{ marginTop: 15 }}>
                                <ProductOrderDetails
                                    tabsCancel={this.props.tabsCancel}
                                    label="Detail Pesenan"
                                    key={order.id}
                                    productId={order.productId}
                                    note={order.note}
                                    productImage={order.productImage}
                                    variants={order.variants}
                                    productName={order.productName}
                                    productQuantity={order.productQuantity}
                                    totalAmount={order.totalAmount}
                                />
                                <PaymentInfo
                                    productQuantity={order.productQuantity}
                                    cancelDate={this.state.cancelDate}
                                    cancelBy={this.state.cancelBy}
                                    shipping={this.state.shipping}
                                    payment={this.state.payment}
                                    exspedisi={this.state.expedisi}
                                    price={order.price}
                                    totalAmount={order.totalAmount}
                                    productName={order.productName}
                                />
                            </div>
                            <OrderStatusUser
                                label="Pengiriman"
                                customer={this.state.address} />
                        </React.Fragment>
                    )
                })}
            </React.Fragment>
        );
    }
}

export default OrderDetailsCancel;