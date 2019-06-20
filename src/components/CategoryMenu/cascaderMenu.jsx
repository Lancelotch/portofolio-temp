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

    const createSubChildren = (children = [], idCategory, subCategoryId) => {
        return (
            (children &&
                children.map(child => ({
                    value: child.id,
                    label: <span> <Link
                        key={child.id}
                        className="default"
                        to={`${url}/${idCategory}/${subCategoryId}/${child.id}`}>
                        {child.name}
                    </Link></span>
                }))) || []
        );
    };

    const createChildren = (children = [], idCategory) => {
        return (
            children &&
            children.map(child => ({
                value: child.id,
                label: <span><Link key={child.id} className="default" to={`${url}/${idCategory}/${child.id}`}>
                    {child.name}
                </Link></span>,
                children: createSubChildren(child.categorySubChildResponses, child.id, idCategory)
            }))
        );
    };

    const url = isUrlIsCategory(match.url);
    // const options = allCategory.map(build_menu);
    const options = allCategory.map(category => ({
        value: category.id,
        label: <span> <Link key={category.id} className="default" to={`${url}/${category.id}`}>{category.name}</Link></span>,
        children: createChildren(category.categorySubResponses, category.id)
    }));

    return (
        <React.Fragment>
            <Row>
                <Col md={24}>
                    <Cascader key={"id"} options={options} expandTrigger={"hover"}>
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