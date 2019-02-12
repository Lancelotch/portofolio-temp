import httpClients from "./httpClients";
import urls from "../urls";

export const apiGetProductById = productId => {
    return new Promise((resolve, reject) => {
        httpClients.mainService
        .request({
        method: "GET",
        url: urls.mainServices + urls.GetProductById + productId
        }).then(response => {
            resolve(response.data);
        }).catch(error => {
            reject(error);
        });
    });
};