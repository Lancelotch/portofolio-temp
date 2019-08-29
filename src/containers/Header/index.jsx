import React from "react";
import { useRootContext } from "../../hoc/RootContext";
import { Row, Col, Icon } from "antd";
import Search from "../../components/Search";
import strings from "../../localization/localization";
import CategoryMenuCascader from "../../components/CategoryMenu/cascaderMenu";
import Popover from "./Popover";
import DataSource from "../../hoc/DataSource";
import PATH_URL from "../../routers/path";
import Helpers from "./Helpers";
import Greeting from "./Greeting";
import "./style.sass";

export default function Header() {
  const { isAuthenticated, history, match } = useRootContext();

  return (
    <React.Fragment>
      <Row id="bottomHeader" className="header">
        <Col md={5}>
          <img
            src={require("assets/img/monggopesen_logo.png")}
            className="header__logo"
            alt=""
            onClick={() => history.push("/")}
          />
        </Col>
        <Col md={15} className="header__search-box">
          <div style={{ width: 600 }}>
            <Search
              placeholder={strings.search_place_holder}
              id="filter"
              defaultValue=""
              onSearch={() => {}}
              onChange={() => {}}
            />
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
        <Col md={2}>
          <div className="header__categories" key={""}>
            <DataSource
              url={PATH_URL.GET_CATEGORY}
              render={data => (
                <CategoryMenuCascader
                  key={"id"}
                  match={match}
                  allCategory={data.data.data}
                />
              )}
            />
          </div>
        </Col>
        <Col md={14}>
          <Helpers/>
        </Col>
        <Col md={8} style={{ display: "flex", justifyContent: "flex-end" }}>
          <div className="header__greeting">
            <Greeting isAuthenticated={isAuthenticated} />
          </div>
          <div className="header__user-box">
            <Icon type="user" className="header__user-icon" />
            <div className="wrap-header-dropdown">
              <Popover
                isAuthenticated={isAuthenticated}
                name="Candra"
              />
            </div>
          </div>
        </Col>
      </Row>
    </React.Fragment>
  );
}
