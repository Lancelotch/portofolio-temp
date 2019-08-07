import React from "react";
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import { withBreadcrumbs } from './withBreadcrumbs';
//import routes from "../routers/routes";

const UserBreadcrumbLevel1 = ({ match }) =>
    <span>{match.params.categoryLevel1}</span>;

const UserBreadcrumbLevel2 = ({ match }) =>
    <span>{match.params.categoryLevel2}</span>;

const UserBreadcrumbLevel3 = ({ match }) =>
    <span>{match.params.categoryLevel3}</span>;


const routes = [
    { path: 'users', breadcrumb: 'Users' },
    { path: '/category/:categoryLevel1', breadcrumb: UserBreadcrumbLevel1 },
    { path: '/category/:categoryLevel1/:categoryLevel2', breadcrumb: UserBreadcrumbLevel2 },
    { path: '/category/:categoryLevel1/:categoryLevel2/:categoryLevel3', breadcrumb: UserBreadcrumbLevel3 },
    { path: '/product-detail/:productId', breadcrumb: 'Product-Detail' }
];

const Breadcrumbs = ({ breadcrumbs }) => {
    const extraBreadcrumbItems = breadcrumbs.map(({ breadcrumb, path, match }) => {
        return (
            <Breadcrumb.Item key={match.url}>
                <Link className='mp-breadcrumb-active' to={match.url}>
                    {breadcrumb}
                </Link>
                <span>/</span>
            </Breadcrumb.Item>
        )
    })

    const breadcrumbItems = [
        <Breadcrumb.Item key="home">
            <Link to="/">Home</Link>
        </Breadcrumb.Item>,
    ].concat(extraBreadcrumbItems);

    return (
        <div style={{ marginTop: 30 }}>
            <Breadcrumb className="mp-breadcrumbs">{breadcrumbItems}</Breadcrumb>
        </div>
    )
}
export default withBreadcrumbs(routes)(Breadcrumbs);
