import React from "react";
import "./style.sass";
import { Cascader, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";
//import CascaderMenuDummy from "./CascaderDummy";

const CategoryMenuCascader = props => {

    const { allCategory, match } = props
    // const build_menu = category => {
    //     let itemMenu = {
    //         value: category.id,
    //         label: category.name
    //     };
    //     if (category.categorySubResponses !== undefined)
    //         return {
    //             ...itemMenu,
    //             children: category.categorySubResponses.map(build_menu)
    //         };
    //     if (category.categorySubChildResponses !== undefined)
    //         return {
    //             ...itemMenu,
    //             children: category.categorySubChildResponses.map(build_menu)
    //         };
    //     return {
    //         ...itemMenu,
    //         children: undefined
    //     };
    // };

    const isUrlIsCategory = url => {
        if (url === "/category") return url;
        else return "/category";
    };

    const createSubChildren = (children = [], subCategoryId, idCategory) => {
        return (
            (children &&
                children.map(child => ({
                    value: child.id,
                    label: <Link         
                        key={child.id}
                        className="defaultCategoryMenu"
                        to={`${url}/${idCategory}/${subCategoryId}/${child.idName}`}>
                        {child.name}
                    </Link>
                }))) || []
        );
    };

    const createChildren = (children = [], idCategory) => {
        return (
            children &&
            children.map(child => ({
                value: child.id,
                label: <Link key={child.id}    
                    className="defaultCategoryMenu"
                    to={`${url}/${idCategory}/${child.idName}`}>
                    {child.name}
                </Link>,
                children: createSubChildren(child.categorySubChildResponses, child.idName, idCategory)
            }))
        );
    };


    const url = isUrlIsCategory(match.url);
    // const options = allCategory.map(build_menu);
    const options = allCategory.map(category => ({
        value: category.id,
        label: <Link key={category.id}
            className="defaultCategoryMenu"
            to={`${url}/${category.idName}`}>
            {category.name}
        </Link>,
        children: createChildren(category.categorySubResponses, category.idName)
    }));

    return (
            <Row>
                <Col md={24}>
                    <Cascader key={"id"} popupClassName={"cascader-popup header__categoriess"} options={options} expandTrigger={"hover"}>
                        <a className="ant-dropdown-link" href="/#">
                            <span className="category">Kategori</span>
                            <Icon style={{ color: "#999999" }} type="down" />
                        </a>
                    </Cascader>
                </Col>
            </Row>
    );
}

export default CategoryMenuCascader;