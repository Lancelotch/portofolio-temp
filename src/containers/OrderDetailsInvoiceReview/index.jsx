import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { Form, Card, Rate, Input, Checkbox } from 'antd';
import ReviewCardInfoDetail from '../../components/ReviewCardInfoDetail';
import ButtonBackAndTittleDashboard from '../../components/ButtonBackAndTittleDashboard';
import "./style.sass";
import UploadImageReviewDashboard from '../../components/UploadImageReviewDashboard';
import Button from '../../components/Button';
import { schema } from './schema';
import convertSchemaToInit from '../../library/convertSchemaToInit';
import UploadImage from '../../components/UploadImage';


const { TextArea } = Input

export default function OrderDetailsInvoiceReview(props) {
    const [value, setValue] = useState(0)
    const [payload, setPayload] = useState(convertSchemaToInit(schema));
    const [isAnonymous, setIsAnonymous] = useState(false)
    const [initialValues, setInitialValues] = useState();
    const orderRespon = props.orderDetailsReview
    const desc = ['Sangat Buruk', 'Buruk', 'Cukup', 'Bagus', 'Bagus Banget'];


    function handleChangeRate(value) {
        console.log(value);

        setPayload({
            ...payload,
            rating: value
        })
    };

    function successChangeUploadImage(value) {
        const payloadItems = [...payload.images]
        const breadcrumbs = [];
        value.forEach((value, index) => {
            const breadcrumb = {
              label: value
            };
            breadcrumbs.push(breadcrumb);
          });
        
         
          console.log(breadcrumbs);
          
        
      
        let array = []
    
          const tempItems ={ ...payload.images, mediumUrl: value, alt: '', isDefault: true }
        
        console.log('tempItems=====>',tempItems);
        array.push(tempItems)
        
        console.log(array);
        
        setPayload({
            ...payload,
            images: tempItems
        })
    }

    console.log(payload.images);

    function handleChangeChecklist(value) {
        setPayload({
            ...payload,
            isAnonymous: value
        })

    }

    function handleSubmit(value) {
        console.log(value);

    }

    return (
        <React.Fragment>
            <ButtonBackAndTittleDashboard
                tittle={"Ulasan Produk"}
                setIsShowDetailDashboard={props.setIsShowDetailDashboard} />
            <Card style={{ marginBottom: 15 }}>
                {orderRespon.order.orderItems.map((order) => {
                    return <ReviewCardInfoDetail order={order} />
                })}
            </Card>
            <Card>
                <Formik
                    enableReinitialize
                    initialValues={payload}
                    onSubmit={values => {
                        handleSubmit(values);
                    }}
                    validationSchema={schema}>
                    {({ values, handleSubmit, errors, handleChange }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Item
                                validateStatus={errors.rating && "error"}
                                help={errors.rating}>
                                <div className="mp-order-details-review">
                                    <p>Bagaimana pendapatmu soal produk ini?</p>
                                    <span>
                                        <Rate
                                            onChange={handleChangeRate}
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
                                    onChange={handleChange}
                                    name="message"
                                    style={{ width: "70%" }}
                                    placeholder="Controlled autosize"
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                />
                            </Form.Item>
                            <Form.Item>
                                <p>Foto produk</p>
                                <UploadImage
                                    successChangeUploadImage={successChangeUploadImage}
                                />
                            </Form.Item>
                            <div className="mp-order-details-review-button">
                                <Form.Item validateStatus={errors.isAnonymous && "error"}
                                    help={errors.isAnonymous}>
                                    <Checkbox name="isAnonymous" onChange={handleChangeChecklist}>
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
        </React.Fragment >
    );
};

