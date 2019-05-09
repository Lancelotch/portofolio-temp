import {
    // mainService
    // , dummyService
     dummyServiceWithToken
} from './httpClient';
import {
    PATH_CUSTOMER
} from '../path'
const token = localStorage.getItem("accessToken");
const customerDetail = () => {
    return new Promise((resolve, reject) => {
        dummyServiceWithToken
            .request({
                method: 'GET',
                url: PATH_CUSTOMER.CUSTOMER,
                // headers: {
                //     Authorization: "Bearer " + token
                //   }
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