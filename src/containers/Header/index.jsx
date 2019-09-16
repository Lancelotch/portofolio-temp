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
        <Col md={4}>
          <div>
            <img
              src={require("assets/img/icon_header.png")}
              alt="header_icon"
              className="header__icon"
            />
          </div>
        </Col>
        <Col md={16}>
          <CategoryMenu key={"id"} match={match} allCategory={allCategory} />
          <Helpers />
        </Col>
        <Col md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <Greeting isAuthenticated={isAuthenticated} />
          <Popover />
        </Col>
      </Row>
    </React.Fragment>
  );
}
