import { serviceWithoutToken } from './httpClient';
import { PATH_PRODUCT} from '../path'


const getProductDetail = productId => {  
    return new Promise((resolve,reject) => {
        serviceWithoutToken()
            .request({
                method: 'GET',
                url: PATH_PRODUCT.PRODUCT_BY_ID+productId
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const productDetail = {
    getProductDetail : getProductDetail
}

export default productDetail;
