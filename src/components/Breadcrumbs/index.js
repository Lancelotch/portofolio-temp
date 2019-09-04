import React from "react";
import { Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import { withBreadcrumbs } from "../../library/withBreadcrumbs.js";
import { escapeRegExp } from "../../library/regex.js";
import PATH_URL from "../../routers/path";

import "./style.sass";

const CategoryBreadCrumbLevel1 = ({ match }) => (
  <span>{escapeRegExp(match.params.categoryLevel1)}</span>
);

const CategoryBreadCrumbLevel2 = ({ match }) => (
  <span>{escapeRegExp(match.params.categoryLevel2)}</span>
);

const CategoryBreadCrumbLevel3 = ({ match }) => (
  <span>{escapeRegExp(match.params.categoryLevel3)}</span>
);


const breadcrumbRoutes = [
  {
    path: `${PATH_URL.CATEGORY_LEVEL_1}`, 
    breadcrumb: CategoryBreadCrumbLevel1
  },
  {
    path: `${PATH_URL.CATEGORY_LEVEL_1}/:${"categoryLevel2"}`,
    breadcrumb: CategoryBreadCrumbLevel2
  },
  {
    path: `${PATH_URL.CATEGORY_LEVEL_1}/:${"categoryLevel2"}/:${"categoryLevel3"}`,
    breadcrumb: CategoryBreadCrumbLevel3
  },
  {
    path: `${PATH_URL.PRODUCT_DETAIL}`, 
    breadcrumb: "product detail"
  }
];

const Breadcrumbs = ({ breadcrumbs, information,category }) => {
  const extraBreadcrumbItems = breadcrumbs.map(
    ({ breadcrumb, path, match }) => {
      return (
        <Breadcrumb.Item key={match.url}>
          <Link replace to={match.url} className="mp-breadcrumbs-actived">
            {breadcrumb}
          </Link>
        </Breadcrumb.Item>
      );
    }
  );

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">monggopesen</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems);

  return (
    <div style={{ marginTop: 30 }}>
      <Breadcrumb separator=">" className="mp-breadcrumbs">
        {breadcrumbItems}
        <Breadcrumb.Item>{category.level1}{information}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default withBreadcrumbs(breadcrumbRoutes)(Breadcrumbs);
