import React from "react";
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { withBreadcrumbs } from './withBreadcrumbs';
import PATH_URL from "../routers/path";
import { escapeRegExp } from "./regex";


const UserBreadcrumbLevel1 = ({ match }) =>
    <span>{escapeRegExp(match.params.categoryLevel1)}</span>;

const UserBreadcrumbLevel2 = ({ match }) =>
    <span>{escapeRegExp(match.params.categoryLevel2)}</span>;

const UserBreadcrumbLevel3 = ({ match }) =>
    <span>{escapeRegExp(match.params.categoryLevel3)}</span>;


const breadcrumbRoutes = [
    { path: `${PATH_URL.CATEGORY_LEVEL_1}`, breadcrumb: UserBreadcrumbLevel1 },
    { path: `${PATH_URL.CATEGORY_LEVEL_1}/:${"categoryLevel2"}`, breadcrumb: UserBreadcrumbLevel2 },
    { path: `${PATH_URL.CATEGORY_LEVEL_1}/:${"categoryLevel2"}/:${"categoryLevel3"}`, breadcrumb: UserBreadcrumbLevel3 },
    { path: `${PATH_URL.PRODUCT_DETAIL}`, breadcrumb: 'product detail' }
];

const Breadcrumbs = ({ breadcrumbs, information }) => {

    const extraBreadcrumbItems = breadcrumbs.map(({ breadcrumb, path, match }) => {
        return (
            <Breadcrumb.Item key={match.url} separator=">">
                <Link className='mp-breadcrumb-active' replace to={match.url}>
                    {breadcrumb}
                </Link>
                {" "}{information && ">"}{" "}{information}
            </Breadcrumb.Item>
        )
    })

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">monggopesen</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div style={{ marginTop: 30 }}>
            <Breadcrumb separator=">" className="mp-breadcrumbs">{breadcrumbItems}</Breadcrumb>
        </div>
    )
}
export default withBreadcrumbs(breadcrumbRoutes)(Breadcrumbs);
