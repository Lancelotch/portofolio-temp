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
import Button from "../../components/Button";
import TopHeader from "../../components/TopHeader";

export default function Header() {
  const { isAuthenticated, history, match } = useRootContext();
  const initialValue = history.location.search.split("?q=");
  const [allCategory, setAllCategory] = useState([]);
  useEffect(() => {
    getAllCategory();
  }, []);

  async function getAllCategory() {
    let allCategory = await Category.getAll();
    if (allCategory.status === 200) {
      setAllCategory(allCategory.data.data);
    }
  }

  return (
    <React.Fragment>
      <TopHeader />
      <div className="header">
        <Row id="bottomHeader" type="flex" align="middle" className="container">
          <Col md={4}>
            <Link to={PATH_URL.HOME}>
              <img
                src={require("assets/img/monggopesen_logo.png")}
                className="header__logo"
                alt=""
              />
            </Link>
          </Col>
          <Col md={2}>
            <CategoryMenu key={"id"} match={match} allCategory={allCategory} />
          </Col>
          <Col md={12} className="header__search-box">
            <div>
              <Formik
                onSubmit={value => {
                  const keyword = value.search;
                  history.push(`/search?q=${keyword}`);
                }}
                initialValues={{ search: initialValue[1] }}
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
          <Col md={2} offset={1} className="header__icon-box">
            <Icon type="bell" style={{ fontSize: 20, color: "#bebebe" }} />
            <Icon type="heart" style={{ fontSize: 20, color: "#bebebe" }} />
          </Col>
          {isAuthenticated ? (
            <Col md={3} className="header__user-box">
              <Popover />
            </Col>
          ) : (
            <Col md={3} className="header__user-box">
              <Popover />
              <Link to="/register">
                <Button type="secondary">Register</Button>
              </Link>
            </Col>
          )}
        </Row>
      </div>
    </React.Fragment>
  );
}
