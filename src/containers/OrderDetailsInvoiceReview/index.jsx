import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Form, Card, Rate, Input, Checkbox } from 'antd';
import ReviewCardInfoDetail from '../../components/ReviewCardInfoDetail';
import ButtonBackAndTittleDashboard from '../../components/ButtonBackAndTittleDashboard';
import "./style.sass";
import Button from '../../components/Button';
import { schema } from './schema';
import convertSchemaToInit from '../../library/convertSchemaToInit';
import UploadImage from '../../components/UploadImage';
import Product from '../../repository/Product';


const { TextArea } = Input

export default function OrderDetailsInvoiceReview(props) {
    const orderRespon = props.orderDetailsReview
    const invoiceId = orderRespon.id
    const [payload, setPayload] = useState(convertSchemaToInit(schema));
    const desc = ['Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Bagus Banget'];


    useEffect(()=>{
        setPayload({
            ...payload,
            invoiceId : invoiceId
        })
    },[])


    async function actionReview(value) {
        let review = await Product.getCreateReview({
            productId: orderRespon.productId,
            params: value
        })
        return review
    }

    async function handleSubmit(value,resetForm) {
      let response = await actionReview(value)
      if (response.status === 200) {
          resetForm()
          props.setIsShowDetailDashboard(false)
      }
    }

    return (
        <React.Fragment>
            <ButtonBackAndTittleDashboard
                tittle={"Ulasan Produk"}
                setIsShowDetailDashboard={props.setIsShowDetailDashboard} />
            <Card style={{ marginBottom: 15 }}>
                {orderRespon.order.orderItems.map((order, i) => {
                    return <ReviewCardInfoDetail key={i} order={order} />
                })}
            </Card>
            <Card>
                <Formik
                    enableReinitialize
                    initialValues={payload}
                    onSubmit={(values,{resetForm}) => {
                        handleSubmit(values,resetForm)
                    }}
                    validationSchema={schema}>
                    {({ values, handleSubmit, errors, handleChange, setFieldValue }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Item
                                validateStatus={errors.rating && "error"}
                                help={errors.rating}>
                                <div className="mp-order-details-review">
                                    <p>Bagaimana pendapatmu soal produk ini?</p>
                                    <span>
                                        <Rate
                                            onChange={rating => setFieldValue('rating', rating)}
                                            value={values.rating} />
                                        {values.rating ? <span className="ant-rate-text">
                                            {desc[values.rating - 1]}
                                        </span> : ''}
                                    </span>
                                </div>
                            </Form.Item>
                            <hr className="product-order__inline" />
                            <Form.Item
                                validateStatus={errors.message && "error"}
                                help={errors.message}>
                                <p>Tuliskan ulasan</p>
                                <TextArea
                                    value={values.message}
                                    onChange={event => setFieldValue(event.target.name, event.target.value)}
                                    name="message"
                                    style={{ width: "70%" }}
                                    placeholder="Controlled autosize"
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <p>Foto produk</p>
                                <UploadImage
                                    handleChange={handleChange}
                                    images={values.images}
                                    onChange={value => setFieldValue('images', value)}
                                />
                            </Form.Item>
                            <div className="mp-order-details-review-button">
                                <Form.Item
                                    validateStatus={errors.isAnonymous && "error"}
                                    help={errors.isAnonymous}>
                                    <Checkbox name="isAnonymous" defaultChecked={values.isAnonymous}
                                        onChange={handleChange}>
                                        Tampilkan ulasan sebagai anonim?
                                    </Checkbox>
                                </Form.Item>
                                <div>
                                    <Button size="large" marginright="small">Batalkan Ulasan</Button>
                                    <Button type="primary" size="large" htmlType="submit">Kirim Ulasan</Button>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </Card>
        </React.Fragment>
    );
};

