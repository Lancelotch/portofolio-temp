import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Link } from "react-router-dom";
import dataSource from "./dataSource";
import "./style.sass"

const SubMenu = Menu.SubMenu;

const isUrlIsCategory = url => {
  if (url === "/category") return url;
  else return "/category";
};

const renderCategorySubChild = (idCategory, subCategoryId, categorySubChild, url) =>
  categorySubChild.map(({ id, name }) => (
    <Menu.Item
      className="spanRender"
      key={id}
      mode="vertical">
      <span>
        <Link className="renderCategory"
          to={`${url}/${idCategory}/${subCategoryId}/${id}`}>{name}</Link></span>
    </Menu.Item>
  ));

const renderCategorySub = (idCategory, categorySub, url) =>
  categorySub.map(({ id, name, categorySubChild }) => (
    <SubMenu
      className="spanRender__subMenu"
      key={id}
      title={
        // <span >
        //   <Link
        //     // className="renderCategory"
        //     to={`${url}/${idCategory}/${id}`}>
        //     {name}
        //   </Link>
        // </span>
        <span>{name}</span>
      }
      mode="vertical"
    >
      {renderCategorySubChild(idCategory, id, categorySubChild, url)}
    </SubMenu>
  ));

const renderCategory = (dataSource, url) =>
  dataSource.map(({ id, name, categorySub }) => (
    <SubMenu
      className="spanRender"
      style={{ width: 200 }}
      key={id}
      title={
        // <span >
        //   <Link
        //     className="renderCategory"
        //     to={`${url}/${id}`}>
        //     {name}
        //   </Link>
        // </span>
          <span>

            {name}
          </span>
        }
      mode="vertical">
      {renderCategorySub(id, categorySub, url)}
    </SubMenu>
  ));

const menu = props => {
  const { match } = props;
  const url = isUrlIsCategory(match.url);
  return <Menu
    // inlineCollapsed
    style={{ width: 200 }}
    mode="vertical">
    {renderCategory(dataSource, url)}
  </Menu>;
};

const CategoryMenu = props => (
  <Dropdown overlay={menu(props)} trigger={['click']}>
    <a className="ant-dropdown-link" href="/#">
      {/* <b style={{ color: "#007E80" }}>Kategori</b><Icon type="down" style={{ color: "#999999" }} /> */}
      <span className="category">Kategori</span><Icon style={{color: "#999999"}} type="down"></Icon>
    </a>
  </Dropdown>
);

export default CategoryMenu;
