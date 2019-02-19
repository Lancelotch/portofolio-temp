import React from 'react';
import './style.sass'

const Category = (props) => {
    const {id, name} = props.category
    return ( 
        <div className='categories-list'>
            <a href={`/category-product/' + ${id}`}>{name}</a>
        </div>
     );
}
 
export default Category;