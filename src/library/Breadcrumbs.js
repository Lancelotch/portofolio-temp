import React from "react";
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { withBreadcrumbs } from './withBreadcrumbs';
import PATH_URL from "../routers/path";

const UserBreadcrumbLevel1 = ({ match }) =>
    <span>{match.params.categoryLevel1}</span>;

const UserBreadcrumbLevel2 = ({ match }) =>
    <span>{match.params.categoryLevel2}</span>;

const UserBreadcrumbLevel3 = ({ match }) =>
    <span>{match.params.categoryLevel3}</span>;


const routes = [
    { path: PATH_URL.CATEGORY_LEVEL_1, breadcrumb: UserBreadcrumbLevel1 },
    { path: `${PATH_URL.CATEGORY_LEVEL_1}/:${"categoryLevel2"}`, breadcrumb: UserBreadcrumbLevel2 },
    { path: `${PATH_URL.CATEGORY_LEVEL_1}/:${"categoryLevel2"}/:${"categoryLevel3"}`, breadcrumb: UserBreadcrumbLevel3 },
    { path: `${PATH_URL.PRODUCT_DETAIL}`, breadcrumb: 'Product-Detail' }
];

const Breadcrumbs = ({ breadcrumbs }) => {
    const extraBreadcrumbItems = breadcrumbs.map(({ breadcrumb, path, match }) => {
        return (
            <Breadcrumb.Item key={match.url}>
                <Link className='mp-breadcrumb-active' to={match.url}>
                    {breadcrumb}
                </Link>
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
            <Breadcrumb className="mp-breadcrumbs">{breadcrumbItems}</Breadcrumb>
        </div>
    )
}
export default withBreadcrumbs(routes)(Breadcrumbs);
