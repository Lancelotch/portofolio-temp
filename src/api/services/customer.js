import {
    mainService, dummyService, dummyServiceWithToken
} from './httpClient';
import {
    PATH_CUSTOMER
} from '../path'

const customerDetail = () => {
    return new Promise((resolve, reject) => {
        dummyServiceWithToken
            .request({
                method: 'GET',
                url: PATH_CUSTOMER.CUSTOMER
            })
            .then(response => {
                resolve(response.data)
            })
            .catch(error => {
                reject(error.response)
            })
    })
}

const customer = {
    customerDetail: customerDetail
}

export default customer;