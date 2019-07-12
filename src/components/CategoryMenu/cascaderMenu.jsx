import React from "react";
import "./style.sass";
import { Cascader, Icon, Row, Col } from "antd";
import { Link } from "react-router-dom";
//import CascaderMenuDummy from "./CascaderDummy";

const CategoryMenuCascader = props => {

    const { allCategory, match, marginTopDropdown } = props

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

    const createSubChildren = (children = [], idCategory, subCategoryId) => {
        return (
            (children &&
                children.map(child => ({
                    value: child.id,
                    label: <Link
                    style={{ width: "100%", display: "block", height: "31px" }}
                        key={child.id}
                        className="default"
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
                label: <Link key={child.id} style={{ width: "100%", display: "block", height: "31px" }} className="default" to={`${url}/${idCategory}/${child.idName}`}>
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
        label: <Link key={category.id} style={{ width: "100%", display: "block", height: "31px" }} className="default" to={`${url}/${category.idName}`}>{category.name}</Link>,
        children: createChildren(category.categorySubResponses, category.idName)
    }));

    return (
        <React.Fragment>
            <Row>
                <Col md={24}>
                    <Cascader key={"id"} popupClassName={marginTopDropdown == 120 ? "cascader-popup header__categoriess" : "cascader-popup-scroll header__categoriess"} options={options} expandTrigger={"hover"}>
                        <a className="ant-dropdown-link" href="/#">
                            <span className="category">Kategori</span>
                            <Icon style={{ color: "#999999" }} type="down" />
                        </a>
                    </Cascader>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default CategoryMenuCascader;