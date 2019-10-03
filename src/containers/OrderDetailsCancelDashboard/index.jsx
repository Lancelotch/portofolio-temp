import React, { useState } from 'react';
import ButtonBackAndTittleDashboard from '../../components/ButtonBackAndTittleDashboard';
import { Form, Card, Radio, Input } from 'antd';
import ReviewCardInfoDetail from '../../components/ReviewCardInfoDetail';
import { schema } from '../OrderDetailsCancelDashboard/schema';
import { Formik } from 'formik';
import Button from '../../components/Button';
import convertSchemaToInit from '../../library/convertSchemaToInit';
import Order from '../../repository/Order';


const { TextArea } = Input

export default function OrderDetailsCancelDashboard(props) {
    const [note, setNote] = useState(convertSchemaToInit(schema))
    const [value,setValue] = useState("")
    const { orderDetailsCancel } = props

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    function onChange(event){
        setNote({
            ...note,
            note : event.target.value
        })
        setValue(event.target.value)
    }

    async function actionCancelConfirm(params,resetForm) {
        const cancelOrder = await Order.cancel({
            idOrder: orderDetailsCancel.order.id,
            params : params
        })
        if (cancelOrder.status === 200 || cancelOrder.status === "200") {
            props.actionUpdateTab(0);
            resetForm()
            props.setIsShowDetailDashboard()
        }
    };

    async function handleSubmit(value, resetForm) {
        actionCancelConfirm(value, resetForm)
    }

    const dataCancelOrder = [
        {
            reason: "Menemukan barang yang lebih murah"
        },
        {
            reason: "Ingin mengganti alamat"
        },
        {
            reason: "Ingin menambah jumlah barang"
        },
        {
            reason: "Lainya"
        }
    ]

    return (
        <React.Fragment>
            <ButtonBackAndTittleDashboard
                tittle={"Alasan Pembatalan"}
                setIsShowDetailDashboard={props.setIsShowDetailDashboard} />
            <Card>
                {orderDetailsCancel.order.orderItems.map((order, i) => {
                    return <ReviewCardInfoDetail key={i} order={order} />
                })}
            </Card>
            <Card>
                <Formik
                    enableReinitialize
                    initialValues={note}
                    onSubmit={(values,{resetForm}) => {
                        handleSubmit(values,resetForm)
                    }}
                    validationSchema={schema}>
                    {({ values, setFieldValue, errors, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>
                            <Form.Item
                                validateStatus={errors.note && "error"}
                                help={errors.note}>
                                <Radio.Group
                                    name="note"
                                    onChange={onChange}
                                    value={values.note}>
                                    {dataCancelOrder.map(cancel => {
                                        return (
                                            <Radio name="note"
                                                style={radioStyle}
                                                value={cancel.reason}>
                                                {cancel.reason}
                                            </Radio>)
                                    })}
                                </Radio.Group>
                            </Form.Item>
                            <Form.Item>
                            {value === "Lainya" &&
                                <TextArea
                                    onChange={event => setFieldValue(event.target.name, event.target.value)}
                                    name="note"
                                    style={{ width: "70%" }}
                                    placeholder="Isikan Alasan Anda"
                                    autosize={{ minRows: 3, maxRows: 5 }}
                                />}
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" size="large" htmlType="submit">Batalkan Pesenan</Button>
                            </Form.Item>
                        </Form>
                    )}
                </Formik>
            </Card>
        </React.Fragment>
    );
};