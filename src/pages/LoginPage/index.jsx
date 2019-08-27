import React, { useEffect } from "react";
import { Icon, Form, Row, Col } from "antd";
import { Formik } from "formik";
import "./style.sass";
import Button from "../../components/Button";
import Input from "../../components/Input";
import logo from "../../assets/img/logo_monggopesen/ic_logo_bag_borderteal.png";
import { useRootContext } from "../../hoc/RootContext";
import PATH_URL from "../../routers/path";
import FormLogin from "../../containers/FormLogin";
//import { schema } from "./schema";

function Login() {
  const { handleLogin, isSubmitting, isAuthenticated, history } = useRootContext()

  useEffect(() => {
    if (isAuthenticated) {
      history.push(PATH_URL.HOME);
    }
  })

  return (
    <React.Fragment>
    <Row style={{display: "flex"}}>
      <Col md={{ span: 14 }}>
        <div
          className="scrollable-container"
          style={{height: "100%"}}
       
        >
          
        </div>
      </Col>
      <FormLogin/>
      </Row>
      </React.Fragment>
  );
}

export default Login;
