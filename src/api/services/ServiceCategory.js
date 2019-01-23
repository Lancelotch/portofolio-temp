import urls from "../urls";
import httpClient  from "../config/httpClient";

const CategoryFeature = () => {
    return new Promise((resolve, reject) => {
      httpClient.mainService
        .request({
          method: "GET",
          url: urls.GetCategoryFeature
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response);
        });
    });
  };

const PromoFeature = ()=> {
  return new Promise((resolve, reject) => {
    httpClient.httpClientMainService
      .request({
        method: "GET",
        url: urls.GetPromoFeature
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

const SliderHome = () => {
  return new Promise((resolve, reject) => {
    httpClient.mainService
      .request({
        method: "GET",
        url: urls.GetSliderHome
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
}

const serviceCategory = {
  CategoryFeature : CategoryFeature,
  PromoFeature : PromoFeature,
  SliderHome : SliderHome
}

export default serviceCategory;
