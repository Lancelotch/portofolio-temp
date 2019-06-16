import React from "react";
import { Menu, Dropdown, Icon } from "antd";
import { Link } from "react-router-dom";
//import dataSource from "./dataSource";
import "./style.sass"
import { Cascader } from "antd";


const SubMenu = Menu.SubMenu;

const isUrlIsCategory = url => {
  if (url === "/category") return url;
  else return "/category";
};

const options = [
  {
    value: "zhejiang",
    label: <a href="/">"Zhejiang"</a>,
    children: [
      {
        value: "hangzhou",
        label: "Hangzhou",
        children: [
          {
            value: "hangzhou",
            label: "Hangzhou",
            children: [
              {
                value: "hangzhou",
                label: "Hangzhou"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    value: "jiangsu",
    label: "Jiangsu",
    children: [
      {
        value: "nanjing",
        label: "Nanjing"
      }
    ]
  }
];

const renderCategorySubChild = (idCategory, subCategoryId, categorySubChild, url) =>
  categorySubChild.map(({ id, name }) => (
    <Menu.Item
      key={id}
      mode="vertical">
      <span>
        <Link className="default"
          to={`${url}/${idCategory}/${subCategoryId}/${id}`}>{name}</Link></span>
    </Menu.Item>
  ));

const renderCategorySub = (idCategory, categorySub, url) =>
  categorySub.map(({ id, name, categorySubChildResponses }) => (
    <SubMenu
      key={id}
      title={
        <span >
          <Link
            className="default"
            to={`${url}/${idCategory}/${id}`}>
            {name}
          </Link>
        </span>
        // <span>{name}</span>
      }
      mode="vertical"
    >
      {categorySubChildResponses && renderCategorySubChild(idCategory, id, categorySubChildResponses, url)}
    </SubMenu>
  ));


const renderCategory = (dataSource, url) =>
  dataSource.map(({ id, name, categorySubResponses }) => (
    <SubMenu
      
      style={{ width: 200 }}
      key={id}
      title={
        <span>
          <Link
            className="default"
            to={`${url}/${id}`}>
            {name}
          </Link>
        </span>
        }
      mode="vertical">
      {categorySubResponses && renderCategorySub(id, categorySubResponses, url)}
    </SubMenu>
  ));

const menu = props => {
  const { match,allCategory } = props;
  console.log('category menu',props);
  
  const url = isUrlIsCategory(match.url);
  return <Menu
    style={{ width: 200, padding: "10px 0 10px"}}
    className="spanRender"
    forceSubMenuRender
    mode="vertical">
    {props.allCategory && renderCategory(allCategory, url)}
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

export  const CategoryMenuPart = () => (
  <Cascader options={options} expandTrigger={'hover'}	 >
  <a href="#">Change city{}</a>
</Cascader>
);




export default CategoryMenu;
