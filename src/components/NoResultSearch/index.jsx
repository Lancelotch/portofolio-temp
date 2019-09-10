import React from "react";
import { Row, Col } from "antd";
import { Link } from "react-router-dom";
import "./style.sass";
import strings from "../../localization/localization";

const NoResultSearch = props => {
  const { query } = props;
  return (
    <div className="mp-search-result">
      <Row>
        <Col md={24}>
          <div className="mp-search-result-content">
            <h2>Hmm..</h2>
            <p className="mp-search-result-content__paragraph">
              {" "}
              Kami tidak bisa menemukan
              <b className="mp-search-result-content__query">
                "{query}"
              </b>{" "}
              yang anda cari.
            </p>
            <span className="mp-search-result-content__paragraph-bottom">
              {strings.paragraph_search}
              <Link className="mp-search-result-content__link-result-content" to="/">
                &nbsp;
                {strings.help_search}
              </Link>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default NoResultSearch;
