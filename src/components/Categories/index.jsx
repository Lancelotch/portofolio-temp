import React, { Component } from 'react';
import { Icon, Dropdown, Menu } from 'antd'
import Category from '../Category'
import strings from '../../localization/localization'
import './style.sass'
import category from '../../api/services/category';
import {Link} from 'react-router-dom'


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
        console.log(categoryList)
      }catch(error){
        console.log(error);
        
      }
  }

  suggestedProduct = () => {
    const {categoryList} = this.state
    return(
      <React.Fragment>
        {categoryList[0].map()}
      </React.Fragment>
    )
  }


  render () {
    const {categoryList, isCategoryLoaded } = this.state
    console.log(isCategoryLoaded)
    console.log(categoryList)
   
    const categoryMenu = (
      <React.Fragment>
        {categoryList.map(category => (
          <Menu>
            <Menu.Item key={category.id}>
              <Link to={`/category/ ${category.id}`}>
              {category.name}
              </Link>
            </Menu.Item>
          </Menu>
        ))}
      </React.Fragment>
    )


    return (
      <React.Fragment>
        <Dropdown  overlay={categoryMenu} trigger={['click']}>
          <a className='categories-title' href={' '}>
            {strings.category} <Icon type='down' />
          </a>
        </Dropdown>
      </React.Fragment>
    )
  }
}

export default Categories;
