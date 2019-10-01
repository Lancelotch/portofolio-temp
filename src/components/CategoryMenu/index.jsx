import React from "react";
import "./style.sass";
import { Cascader } from "antd";
import { Link } from "react-router-dom";

export default function CategoryMenu(props) {
  const { allCategory } = props;
  const url = "/category";
  const createSubChildren = (children = [], subCategoryId, idCategory) => {
    return (
      (children &&
        children.map(child => ({
          value: child.id,
          label: (
            <Link
              key={child.id}
              className="defaultCategoryMenu"
              to={`${url}/${idCategory}/${subCategoryId}/${child.idName}`}
            >
              {child.name}
            </Link>
          )
        }))) ||
      []
    );
  };

  const createChildren = (children = [], idCategory) => {
    return (
      children &&
      children.map(child => ({
        value: child.id,
        label: (
          <Link
            key={child.id}
            className="defaultCategoryMenu"
            to={`${url}/${idCategory}/${child.idName}`}
          >
            {child.name}
          </Link>
        ),
        children: createSubChildren(
          child.categorySubChildResponses,
          child.idName,
          idCategory
        )
      }))
    );
  };

  function getOptions() {
    const options =
      allCategory &&
      allCategory.map(category => ({
        value: category.id,
        label: (
          <Link
            key={category.id}
            className="defaultCategoryMenu"
            to={`${url}/${category.idName}`}
          >
            {category.name}
          </Link>
        ),
        children: createChildren(category.categorySubResponses, category.idName)
      }));
    return options;
  }

  return (
    <Cascader
      key={"id"}
      popupClassName={"cascader-popup header__categoriess"}
      options={getOptions()}
      expandTrigger={"hover"}
    >
      <span className="category">Kategori</span>
    </Cascader>
  );
}
