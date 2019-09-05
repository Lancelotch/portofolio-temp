import React, { useState, useEffect } from "react";
import { Row, Col, Spin, Form } from "antd";
// import { connect } from "react-redux";
import FormAddAddress from "../../containers/FormAddAddress";
// import { addressDefault } from "../../store/actions/address";
import {
  apiPostWithToken,
  apiGetWithToken,
  // apiPutWithToken
} from "../../services/api/index";
import { PATH_CUSTOMER, PATH_ORDER} from "../../api/path";
import {PATH_SHIPPING} from "../../services/path/shipping";
import { AddressCheckout } from "../../components/AddressCheckout";
import FormEditAddress from "../../containers/FormEditAddress";
import AddressList from "../../containers/AddressList";
import OrderDetailContainer from "../../containers/OrderDetail";
import OrderSummary from "../../components/OrderSummary";
import strings from "../../localization/localization";
// import ModalSuccess from '../../modal/ModalRegisterSuccess'
// import { openModal } from "../../store/actions/authentication"
import { pageUrlPaymentInfo } from "../../library/url"
import "./style.sass";
import history from "../../routers/history";
import { Link } from "react-router-dom";
import { Formik } from 'formik'
import schemaOrder from './schema'

export default function Checkout (props){
  const [isLoading, setIsLoading] = useState(false)
  const [visibleAddAddress, setVisibleAddAddress] = useState(false)
  const [visibleEditAddress, setVisibleEditAddress] = useState(false)
  const [visibleListAddress, setVisibleListAddress] = useState(false)
  const [customerAddress, setCustomerAddress] = useState({})
  const [addresses, setAddresses] = useState([])
  // const [cities, setCities] = useState([])
  const [subdistricts, setSubdistricts] = useState([])
  const [isProductDetailAvailable, setIsProductDetailAvailable] = useState(false)
  const [shipmentFee, setShipmentFee] = useState({})
  const [maxOrder, setMaxOrder] = useState(0)
  const [priceProduct, setPriceProduct] = useState(0)
  const [priceJne, setPriceJne] = useState(0)
  // const [quantity, setQuantity] = useState(1)
  const [payloadProductDetail, setPayloadProductDetail] = useState({})
  const [jneChecked, setJneChecked] = useState(false)
  const [payload, setPayload] = useState({
    customerAddressId : '5d79413c-a81f-4f9c-8701-8684b1ee6199',
    amount : 0,
    items : [
      {
        notes : '',
        productId : '',
        quantity : 1,
        shipment : 'sea',
        variants : []
      }
    ]
  })

  useEffect(() => {
    getListAddress();
    getPayloadProductDetail();
    
    initCustomerAddress();
    getFareExpedisi();
    getSubdistrict()
  },[priceJne])

  async function initCustomerAddress () {
    // await props.addressDefault();
    // this.setState(
    //   { customerAddress: this.props.dataAddressDefault }
    //   , () => {
    //     this.getCities(this.state.customerAddress.provinceId);
    //     this.getSubdistrict(this.state.customerAddress.cityId);
    //   }
    // );
  };

  async function getSubdistrict (id) {
    const params = {
      city: id
    };
    try {
      const response = await apiGetWithToken(
        PATH_CUSTOMER.ADDRESS_SUBDISTRICT,
        params
      );
      setSubdistricts(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  async function getFareExpedisi () {
    try {
      const response = await apiPostWithToken(PATH_SHIPPING.JNE, {})
      setPriceJne(response.data.data.price)
    } catch (error) {
      console.log(error);

    }
  }

  function getPayloadProductDetail () {
    const dataProductDetail = JSON.parse(localStorage.getItem("product"));
    const dataVariants = variantsRequest(dataProductDetail.sku)
    
    setIsProductDetailAvailable(true)
    setPriceProduct(dataProductDetail.price)
    setPayloadProductDetail(dataProductDetail)
    setMaxOrder(dataProductDetail.maxOrder)
    setShipmentFee(dataProductDetail.shipmentFee)
    const {quantity , price , shipmentFee} = dataProductDetail
    const total = countTotalAmount(quantity , price , shipmentFee , payload.items[0].shipment )
    const tempPayloadItems = [...payload.items]
    const tempItems = tempPayloadItems.map(temp => {
      return {...temp , 
        productId : dataProductDetail.productId,
        variants : dataVariants,
        quantity : dataProductDetail.quantity
      }
    })
    setPayload({
      ...payload ,
      amount : total,
      productId : dataProductDetail.productId,
      items : tempItems

    })
  };

  function countTotalAmount (quantity, price, shipmentFee , shipment) {
    const subTotal = Number(quantity) * Number(price);
    let totalShippingPrice = 0;
    if (shipment === "air") {
      totalShippingPrice = Number(shipmentFee.difference) * Number(quantity);
    };
    const totalAmount = Number(priceJne)
    const total = shipmentFee.difference ? subTotal + totalShippingPrice + totalAmount : subTotal + totalAmount
    return total
  }

  function setStateNote (event) {
    
    const tempPayloadItems = [...payload.items]
    const tempItems = tempPayloadItems.map(item => {
      return { ...item , notes : event.target.value}
    })
    setPayload({
      ...payload ,
      items : tempItems
    })
  }

  function actionUpdateQuantity (qty)  {
    const total = countTotalAmount(qty, priceProduct , shipmentFee)
    const tempPayloadItems = [...payload.items]
    const tempItems = tempPayloadItems.map(item => {
      return { ...item , quantity : qty}
    })
    setPayload({
      ...payload , 
      amount : total,
      items : tempItems
    })
  };

  function actionChangeShipping (shipping)  {
    const total = countTotalAmount(payload.items[0].quantity, priceProduct , shipmentFee , shipping.shipment)
    const tempPayloadItems = [...payload.items]
    const tempItems = tempPayloadItems.map(item => {
      return { ...item , shipment : shipping.shipment}
    })
    setPayload({
      ...payload ,
      amount : total,
      items : tempItems
    })
  };

  function variantsRequest (variantsRequest) {
    const variants = [];
    variantsRequest.length >= 1 &&
      variantsRequest.forEach(variant => {
        variants.push({
          id: variant.id,
          variantItemId: variant.variantItem.id
        });
      });
    return variants;
  };

  function actionShowAddFormAddress (){
    setVisibleAddAddress(!visibleAddAddress)
  }

  function actionShowEditFormAddress ()  {
    setVisibleEditAddress(!visibleEditAddress)
  };

  function actionShowListAddress () {
    setVisibleListAddress(!visibleListAddress)
  };

  async function getListAddress  () {
    try {
      const response = await apiGetWithToken(PATH_CUSTOMER.ADDRESS);
      // this.setState({
      //   addresses: response.data.data
      // });
      setAddresses(response.data.data)
    } catch (error) {
      console.log(error);
    }
  };

  
  async function actionSubmitEditFormAddress (request) {
    try {
      // const response = await apiPutWithToken(PATH_CUSTOMER.ADDRESS, request);
      // if (response.data.data) {
      //   this.setState(
      //     {
      //       customerAddress: request
      //     },
      //     () => {
      //       getListAddress();
      //       actionShowEditFormAddress();
      //     }
      //   );
      // }
    } catch (error) {
      console.log(error);
    }
  };

  // function splitValue (value) {
  //   const splitValue = value.split("|");
  //   return splitValue;
  // };

  function handleChangeCity (value) {
    // const city = splitValue(value);
    // this.setState(
    //   {
    //     cityId: city[0],
    //     city: city[1]
    //   },
    //   () => this.getSubdistrict(city[0])
    // );
  };

  function actionChangeAddress (address) {
    // this.setState(prevState => ({
    //   customerAddress: address,
    //   visibleListAddress: !prevState.visibleListAddress,
    //   tempCities: this.getCities(address.provinceId),
    //   tempSubdistrict: this.getSubdistrict(address.cityId)
    // }));
    // this.getCities()
  };

  async function actionSubmitAddFormAddress (request){
    try {
      const response = await apiPostWithToken(PATH_CUSTOMER.ADDRESS, request);
      if (response.data.data) {
        const customerAddressId = response.data.data;
        let customerAddress = {
          ...request,
          id: customerAddressId
        };
        setCustomerAddress(customerAddress)
        props.addressDefault();
        getListAddress();
        // if (!this.isAddressAvailable) {
        //   this.props.addressDefault();
        // }
        actionShowAddFormAddress();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChecked () {
    setJneChecked(!jneChecked)
  }

  function handleSubmit (values){
    if(props.isAddressAvailable){
      actionSubmitOrder(values)
    }else{
      actionShowAddFormAddress()
    }
  }

  // async function getCities (id) {
  //   const params = {
  //     province: id
  //   };
  //   try {
  //     const response = await apiGetWithToken(
  //       PATH_CUSTOMER.ADDRESS_CITY,
  //       params
  //     );
  //     // this.setState({ cities: response.data.data });
  //     setCities(response.data.data)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  async function actionSubmitOrder (request){
      try {
      // document.body.style.overflow = "auto"
      setIsLoading(true)
      const quantity = payload.items[0].quantity
      const response = await apiPostWithToken(PATH_ORDER.ORDER, request);
      if (quantity > maxOrder) {
        alert('adasd')
        setIsLoading(false)
      } else {
        if (response.data.data) {
          setTimeout(() => {
            setIsLoading(false)
          }, 700)
          const token = response.data.data.token;
          const snap = window.snap
          snap.pay(token, {
            onSuccess: function (result) {
              history.push("/");
            },
            onPending: function (result) {
              console.log('iniiiii resul', result);

              let order = result.order_id
              console.log('ooooooooooorder', order);
              console.log(order);
              history.push({
                pathname: pageUrlPaymentInfo + order,
                state: { detail: result }
              });
            },
            onError: function (result) {
              history.push("/payment-failed")
              console.log("error");
              console.log('eeeeor snap', result);
            },
            onClose: function () {
              console.log(
                "customer closed the popup without finishing the payment"
              );
            }
          });
        }
      }
    }
    catch (error) {
      setTimeout(() => {
        setIsLoading(true)
      })
      // document.body.style.overflow = "hidden"
      console.log(error);
    }
  }



  return (
    <Spin wrapperClassName="checkoutLoading" size="large" spinning={isLoading} >
      <div className="checkout">
        <div className="container">
          <Row>
            <Col md={24}>
              <center className="checkout__ongkir">Gratis Ongkir Hingga Rp. 30,000 Dengan Belanja Minimum Rp. 200,000</center>
            </Col>
            <Col md={5}>
              <Link to="/">
                <img
                  src={require("assets/img/monggopesen_logo.png")}
                  className="header__logo"
                  alt=""
                />
              </Link>
            </Col>
            <Col md={15}>
              <p className="checkout__text">{strings.checkout}</p>
            </Col>
          </Row>
          <div className="checkout__content">
            <Formik 
              initialValues={payload}
              onSubmit={(values => {
                handleSubmit(values)
              })}
              enableReinitialize
              validationSchema={schemaOrder}
              render={({
                values,
                handleSubmit,
                setFieldValue,
                errors
              }) => (
                
                <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={15} style={{ marginTop: 25 }}>
                    <AddressCheckout
                      customerAddress={customerAddress}
                      // isAddressAvailable={isAddressAvailable}
                      onEditAddress={actionShowEditFormAddress}
                      onSelectListAddress={actionShowListAddress}
                      onAddAddress={actionShowAddFormAddress}
                    />
                    <FormAddAddress
                      visible={visibleAddAddress}
                      onSubmit={actionSubmitAddFormAddress}
                      onCancle={actionShowAddFormAddress}
                      // isAddressAvailable={this.props.isAddressAvailable}
                    />
                    {customerAddress.id && (
                      <FormEditAddress
                        visible={visibleEditAddress}
                        address={customerAddress}
                        onSubmit={actionSubmitEditFormAddress}
                        onCancle={actionShowEditFormAddress}
                        // cities={cities}
                        subdistricts={subdistricts}
                        handleChangeCity={handleChangeCity}
                      />
                    )}
                    <AddressList
                      addresses={addresses}
                      visible={visibleListAddress}
                      onCancle={actionShowListAddress}
                      onChangeAddress={actionChangeAddress}
                      customerAddress={customerAddress}
                    />
                    {isProductDetailAvailable && (
                      <Form.Item>
                         <OrderDetailContainer
                            shipmentFee={shipmentFee.difference}
                            stock={maxOrder}
                            priceProduct={priceProduct}
                            payloadProductDetail={payloadProductDetail}
                            actionChangeShipping={actionChangeShipping}
                            actionUpdateQuantity={actionUpdateQuantity}
                            quantity={values.items[0].quantity}
                            setStateNote={setStateNote}
                          />
                      </Form.Item>
                    )}
                  </Col>
                  <Col md={9}>
                    <OrderSummary
                      isLoading={isLoading}
                      priceJne={priceJne}
                      shipmentFee={shipmentFee.difference}
                      quantity={values.items[0].quantity}
                      total={values.amount}
                      priceProduct={priceProduct}
                      shipment={values.items[0].shipment}
                      checked={jneChecked}
                      handleChecked={handleChecked}
                    />
                  </Col>
                </Row>
                </Form>
              )}
            />
          </div>
        </div>
      </div>
    </Spin>
  )
}
