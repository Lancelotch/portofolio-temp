import React, { useState, useEffect } from 'react';
import monggopesen_logo from "../../assets/img/monggopesen_logo.png";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { Formik } from "formik";
import { Form } from 'antd';
import { schema } from './schema';
import convertSchemaToInit from "../../library/convertSchemaToInit";
import Password from '../../repository/Password';
import history from '../../routers/history';
import { useRootContext } from "../../hoc/RootContext";
import './style.sass';

export default function ResetPassword (props) {
  const [initialValue] = useState(convertSchemaToInit(schema))
  const {handleLogout} = useRootContext()
  const key = props.match.params.key

  async function handleSubmit (values, resetForm){
    const params = {
      password : values.password,
      confirm_password : values.password
    }
    let response = await Password.update({params,key})
    if(response.status === 200){
      handleLogout()
      resetForm({})
      history.push('/login', {reset : true })
    }else{
      console.log("eror",response)
    }
  }
 
  return (
    <div className="reset__container">
      <div className="reset__content">
        <div className="reset__content-position">
          <img src={monggopesen_logo} alt="Monggopesen"/>
        </div>
        <div className="reset__divider-title" />
        <div className="reset__content-position reset__title">Reset Password</div>
        <div className="reset__content-quote">
          Password yang akan digunakan minimal terdiri dari 6 digit dengan kombinasi angka dan huruf.
        </div>
        <Formik 
          onSubmit={(values,{resetForm}) => {
            handleSubmit(values, resetForm)
          }}
          initialValues={initialValue}
          validationSchema={schema}
          validateOnChange={false}
          render={({
            handleSubmit,
            handleChange,
            values,
            errors
          }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Item
                validateStatus={
                  errors.password && 'error'
                }
                help={
                  errors.password && errors.password
                }
              >
                <Input 
                  size="large"
                  width="full"
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                />
              </Form.Item>
              <Form.Item>
              <Button 
                type="primary"
                width="full"
                size="large"
                htmlType="submit"
              >
                Simpan Password
              </Button>
              </Form.Item>
            </Form>
          ) }
        />
        
      </div>
    </div>
  )
}