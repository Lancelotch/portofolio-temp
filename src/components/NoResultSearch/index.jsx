import React from 'react';
import { Row, Col } from 'antd';
import { Link } from "react-router-dom";
import EmptySearchResult from "../../assets/img/ic_background/no_search_result.png";
import "./style.sass";
import strings from '../../localization/localization';

const NoResultSearch = (props) => {
    const { query } = props;
    return (
        <div className="searchResult">
            <Row>
                <Col md={24}>
                    <div style={{ display: "flex" }}>
                        <img src={EmptySearchResult} alt="" />
                        <div className="searchResultContent">
                            <h2>Hmm..</h2>
                            <p className="searchResultContent__paragraph"> Kami tidak bisa menemukan
                            <b style={{ fontStyle: "oblique" }}>"{query}"</b> yang anda cari.</p>
                            <span className="searchResultContent__paragraphBottom">
                                {strings.paragraph_search}
                                <Link style={{ color: "#004853", fontWeight: 500 }} to="/">&nbsp;
                              {strings.help_search}
                          </Link>
                            </span>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>
    );
};

export default NoResultSearch;