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
  }
];

const Breadcrumbs = ({ breadcrumbs, information, category }) => {

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

  let categoryLevel1 = category && category.level1
  let categoryLevel2 = category && category.level2
  let categoryLevel3 = category && category.level3

  const categoryProductDetailBreadCrumbItemLevel3 = [
    <Breadcrumb.Item key={categoryLevel3}>
   <Link className="mp-breadcrumbs-actived"
        to={`${"/category"}/${categoryLevel1}/${categoryLevel2}/${categoryLevel3}`}>
        {categoryLevel3 && escapeRegExp(categoryLevel3)}
      </Link>
    </Breadcrumb.Item>
  ]

  const categoryProductDetailBreadCrumbItemLevel2 = [
    <Breadcrumb.Item key={categoryLevel2}><Link className="mp-breadcrumbs-actived"
        to={`${"/category"}/${categoryLevel1}/${categoryLevel2}`}>
        {categoryLevel2 && escapeRegExp(categoryLevel2)}
      </Link>
    </Breadcrumb.Item>
  ].concat(categoryLevel3 && categoryProductDetailBreadCrumbItemLevel3)

  const categoryProductDetailBreadCrumbItemLevel1 = [
    <Breadcrumb.Item key="1">
    <Link className="mp-breadcrumbs-actived"
        to={`${"/category"}/${categoryLevel1}`}>
        {categoryLevel1 && escapeRegExp(categoryLevel1)}
      </Link>
    </Breadcrumb.Item>
  ].concat(categoryLevel2 && categoryProductDetailBreadCrumbItemLevel2)

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">monggopesen</Link>
    </Breadcrumb.Item>
  ].concat(extraBreadcrumbItems).concat(categoryLevel1 && categoryProductDetailBreadCrumbItemLevel1);

  return (
    <div style={{ marginTop: 30 }}>
      <Breadcrumb separator=">" className="mp-breadcrumbs">
        {breadcrumbItems}
        <Breadcrumb.Item>{information}</Breadcrumb.Item>
      </Breadcrumb>
    </div>
  );
};

export default withBreadcrumbs(breadcrumbRoutes)(Breadcrumbs);
