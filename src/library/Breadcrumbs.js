import React from "react";
import { HashRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom';
import { Breadcrumb, Alert } from 'antd';
import { NavLink } from 'react-router-dom';
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
            {console.log(breadcrumb)}
            
                <Link to={match.url}>
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
        <div className="demo">
            <Breadcrumb>{breadcrumbItems}</Breadcrumb>
        </div>
    )
}
export default withBreadcrumbs(routes)(Breadcrumbs);


// const routes = {
//     '/product-detail/:4409f139-ba50-4598-9b0d-863ec2b79a6f': 'Product',
//     '/category': 'Category',
//     'category/fashion-wanita/atasan/polo-shirt': 'Application2'
// };
// const Breadcrumbs = withRouter(props => {
//     const { location } = props;
//     console.log("========>", location);

//     const pathSnippets = location.pathname.split('/').filter(i => i);
//     const extraBreadcrumbItems = pathSnippets.map((_, index) => {
//         const url = `/${pathSnippets.slice(0, index + 1).join('/')}`;
//         return (
//             <Breadcrumb.Item key={url}>
//                 <Link to={url}>{location.pathname}</Link>
//             </Breadcrumb.Item>
//         );
//     });
//     console.log('asdasd', extraBreadcrumbItems);
//     const breadcrumbItems = [
//         <Breadcrumb.Item key="home">
//             <Link to="/">Home</Link>
//         </Breadcrumb.Item>,
//     ].concat(extraBreadcrumbItems);
//     return (
//         <div className="demo">
//             <Alert style={{ margin: '16px 0' }} message="Click the navigation above to switch:" />
//             <Breadcrumb>{breadcrumbItems}</Breadcrumb>
//         </div>
//     );
// });


// const Breadcrumbs = () => (
//     <div className="breadcrumbs">
//         <ul className='container'>
//             <Link replace to={'/'} style={{ position: "absolute" }}>
//                 Monggopesen
//             </Link>
//             <Route component={BreadcrumbsItem} />
//         </ul>
//     </div>
// )

// const BreadcrumbsItem = ({ match, ...rest }) => (
//     <span>
//         <li className={match.isExact ? 'breadcrumb-active' : undefined}
//             style={{
//                 position: "relative",
//                 left: 100,
//                 listStyle: "none"
//             }}>
//             <Link replace to={match.url || ' '}>
//                 {match.params.productId === undefined ?
//                     match.url.split('/').slice(0, match.url.split('/').length).join(" > ") :
//                     match.url.split('/').slice(0, match.url.split('/').length - 1).join(" > ")
//                 }
//             </Link>
//         </li>
//         <Route path={`${match.url}/:path`} component={BreadcrumbsItem} />
//     </span>
// )


//export default Breadcrumbs