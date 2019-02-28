import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Route, Link } from "react-router-dom";
import dataSource from "./dataSource";
import Category from "../Category";
const SubMenu = Menu.SubMenu;

const isUrlIsCategory = url => {
  if (url === "/category") return url;
  else return "/category";
};

const renderCategorySubChild = (idCategory,subCategoryId,categorySubChild,url) =>
  categorySubChild.map(({ id, name }) => (
    
    <Menu.Item key={id}>
      {/* <Route path={`${url}/${idCategory}/${subCategoryId}/:categoryId`} exact component={Category} /> */}
      <Link to={`${url}/${idCategory}/${subCategoryId}/${id}`}>{`${url}/${idCategory}/${subCategoryId}/:categoryId`}</Link>
    </Menu.Item>
  ));

const renderCategorySub = (idCategory, categorySub, url) =>
  categorySub.map(({ id, name, categorySubChild }) => (
      
    <SubMenu
      key={id}
      title={<Link to={`${url}/${idCategory}/${id}`}>{`${url}/${idCategory}/:categoryId`}</Link>}
    >
    {/* <Route path={`${url}/${idCategory}/:categoryId`} exact component={Category} /> */}
      {renderCategorySubChild(idCategory, id, categorySubChild, url)}
    </SubMenu>
  ));

const renderCategory = (dataSource, url) => 
  dataSource.map(({ id, name, categorySub }) => (
      
      <SubMenu key={id} title={<Link to={`${url}/${id}`}>{`${url}/:categoryId`}</Link>}>
      {/* <Route path={`${url}/:categoryId`} exact component={Category} /> */}
      {renderCategorySub(id, categorySub, url)}
    </SubMenu>
  ));

const menu = props => {
  const { match } = props;
  const url = isUrlIsCategory(match.url);
  return <Menu>{renderCategory(dataSource, url)}</Menu>;
};

const CategoryMenu = props => (
  <Dropdown overlay={menu(props)}>
    <a className="ant-dropdown-link" href="/category">
      Kategori <Icon type="down" />
    </a>
  </Dropdown>
);

export default CategoryMenu;
