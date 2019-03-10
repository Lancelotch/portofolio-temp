import React from 'react';
import { Card } from 'antd'
import currencyRupiah from '../../library/currency'
import { Link } from 'react-router-dom'
import './style.sass'

const BestSeller = props => {
    const { id, name, urlImage, price } = props.product

    const priceRp = currencyRupiah(price)
    return ( 
        <div>
             <Link to='/'>
                <Card
                    bordered={false}
                    style={{
                        height: '330px',
                        width: '200px',
                        padding: '20px',
                        background: '#fffff',
                        borderRadius: '5px'
                    }}
                    cover={
                        <img
                        alt='example'
                        src={urlImage}
                        className='best__image'
                        />
                    }
                    >
                    <div>
                        <p className='best__title'>{name}</p>
                        <p className='best__price'>{priceRp} </p>
                    </div>          
                </Card>
            </Link>
        </div>
     );
}
 
export default BestSeller;