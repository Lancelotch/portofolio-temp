import React, { Component } from 'react';
import { Icon, Dropdown, Menu } from 'antd'
import Category from '../Category'
import strings from '../../localization/localization'
import './style.sass'
import category from '../../api/services/category';


class Categories extends Component {
  constructor (props) {
    super(props)
    this.state = {
        categoryList: [],
        isCategoryLoaded: false
    }
  }
  
  componentDidMount() {
      this.getCategoryFeature()
  }
  
  getCategoryFeature = async () => {
      try{
        const categoryList = await category.categoryFeature();
        this.setState({
            categoryList: categoryList.data,
            isCategoryLoaded: true
        })
      }catch(error){
        console.log(error);
        
      }
  }

  render () {
    const {categoryList, isCategoryLoaded } = this.state
    console.log(isCategoryLoaded)
    const categoryFeature = 
      <React.Fragment>
          {categoryList.map(category => (
            <Category
              key={category.id} 
              category={category}
            />
          ))}
        </React.Fragment>
    
    const categoryMenu =  (
      <Menu>
        <Menu.Item key="0">
          <a> </a>
        </Menu.Item>
        <Menu.Item key="1">
          <a></a>
        </Menu.Item>
      </Menu>
    );

    return (
      <React.Fragment>
        <Dropdown  overlay={categoryMenu} trigger={['click']}>
          <a className='categories-title' href={' '}>
            {strings.category} <Icon type='down' />
          </a>
        </Dropdown>
        {categoryFeature}
      </React.Fragment>
    )
  }
}

export default Categories;
