import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Link } from "react-router-dom";
import dataSource from "./dataSource";

const SubMenu = Menu.SubMenu;

const isUrlIsCategory = url => {
  if (url === "/category") return url;
  else return "/category";
};

const renderCategorySubChild = (idCategory, subCategoryId, categorySubChild, url) =>
  categorySubChild.map(({ id, name }) => (
    <Menu.Item key={id} style={{ width: 256 }} mode="vertical">
      <span><Link to={`${url}/${idCategory}/${subCategoryId}/${id}`}>{name}</Link></span>
    </Menu.Item>
  ));

const renderCategorySub = (idCategory, categorySub, url) =>
  categorySub.map(({ id, name, categorySubChild }) => (
    <SubMenu
      key={id}
      title={<span><Link className="linkCategory" to={`${url}/${idCategory}/${id}`}>{name}</Link></span>}
      style={{ width: 256 }}
      mode="vertical"
    >
      {renderCategorySubChild(idCategory, id, categorySubChild, url)}
    </SubMenu>
  ));

const renderCategory = (dataSource, url) =>
  dataSource.map(({ id, name, categorySub }) => (
    <SubMenu key={id} title={
        <span><Link to={`${url}/${id}`}>{name}</Link></span>}
      style={{ width: 256 }}
      mode="vertical">
      {renderCategorySub(id, categorySub, url)}
    </SubMenu>
  ));

const menu = props => {
  const { match } = props;
  const url = isUrlIsCategory(match.url);
  return <Menu style={{ width: 256 }} mode="vertical">{renderCategory(dataSource, url)}</Menu>;
};

const CategoryMenu = props => (
  <Dropdown overlay={menu(props)} trigger={['click']}>
    <a className="ant-dropdown-link" href="/#">
      <b style={{ color: "#007E80" }}>Kategori</b><Icon type="down" style={{ color: "#999999" }} />
    </a>
  </Dropdown>
);

export default CategoryMenu;
