import { mainService, dummyService } from './httpClient';
import { PATH_PRODUCT} from '../path'


const getProductDetail = (productId) => {
    
    return new Promise((resolve,reject) => {
        dummyService
            .request({
                method: 'GET',
                url: PATH_PRODUCT.PRODUCT+'/'+productId
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
