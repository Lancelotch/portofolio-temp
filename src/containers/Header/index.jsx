import React, { useState, useEffect } from "react";
import { useRootContext } from "../../hoc/RootContext";
import { Row, Col, Icon, Form } from "antd";
import Search from "../../components/Search";
import strings from "../../localization/localization";
import CategoryMenu from "../../components/CategoryMenu";
import Popover from "../Popover";
import PATH_URL from "../../routers/path";
import Helpers from "./Helpers";
import Greeting from "./Greeting";
import "./style.sass";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { schema } from "./schema";
import Category from "../../repository/Category";

export default function Header() {
  const { isAuthenticated, history, match, showAlert } = useRootContext();
  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    getAllCategory();
  }, []);

  async function getAllCategory() {
    let allCategory = await Category.getAll();
    if(allCategory.status === 200) {
      setAllCategory(allCategory.data.data);
    }
  }

  return (
    <React.Fragment>
      <Row id="bottomHeader" className="header">
        <Col md={5}>
          <Link to={PATH_URL.HOME}>
            <img
              src={require("assets/img/monggopesen_logo.png")}
              className="header__logo"
              alt=""
            />
          </Link>
        </Col>
        <Col md={15} className="header__search-box">
          <div style={{ width: 600 }}>
            <Formik
              onSubmit={value => {
                const keyword = value.search;
                history.push(`/search?q=${keyword}`);
              }}
              validationSchema={schema}
              validateOnChange={false}
            >
              {({ values, handleChange, handleSubmit }) => (
                <Form.Item>
                  <Search
                    name="search"
                    value={values.search}
                    placeholder={strings.search_place_holder}
                    onSearch={handleSubmit}
                    onChange={handleChange}
                  />
                </Form.Item>
              )}
            </Formik>
          </div>
        </Col>
        <Col md={4}>
          <div>
            <img
              src={require("assets/img/icon_header.png")}
              alt="header_icon"
              className="header__icon"
              onClick={()=>showAlert({
                title : "ini pesan saya, berbaktilah kepada orang tua",
                showIcon : true,
                animation :'moveBottom'
              })}
            />
          </div>
        </Col>
        <Col md={2}>
          <div className="header__categories" key={""}>            
              <CategoryMenu
              key={"id"}
              match={match}
              allCategory={allCategory}
              />
          </div>
        </Col>
        <Col md={14}>
          <Helpers />
        </Col>
        <Col md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="header__greeting">
            <Greeting isAuthenticated={isAuthenticated} />
          </div>
          <div className="header__user-box">
            <Icon type="user" className="header__user-icon" />
            <div className="wrap-header-dropdown">
              <Popover />
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
