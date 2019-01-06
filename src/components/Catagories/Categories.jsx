import React, { Component } from "react";
import serviceCategory from "../../api/services/ServiceCategory";
import Category from "./Category";
import { Row, Col } from "antd";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryFeature: [],
      isDataCategoryFeatureLoaded: false
    };
    this.getCategoryFeature = this.getCategoryFeature.bind(this);
  }
  componentWillMount() {
    this.getCategoryFeature();
  }

  getCategoryFeature = () => {
    serviceCategory
      .apiCategoryFeature()
      .then(response => {
        const categoryFeature = response.data;
        this.setState({
          categoryFeature: categoryFeature,
          isDataCategoryFeatureLoaded: !this.state.isDataCategoryFeatureLoaded
        });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { categoryFeature } = this.state;
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          {categoryFeature.map((category, index) => {
            if (index <= 2) {
              return (
                // <div>
                // {category.imageUrl}
                // </div>
                <Category
                  key={index}
                  id={category.id}
                  name={category.name}
                  imageUrl={category.imageUrl}
                />
              );
            }
          })}
        </Row>
      </React.Fragment>
    );
  }
}

export default Categories;
