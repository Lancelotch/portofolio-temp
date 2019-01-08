
//Root Service
const mainServices = "https://api.monggopesen.com/main-services/";
const cartServices = "https://api.monggopesen.com/cart-services/";

const cart = "v1/cart/user";

//Authentication Page
const login = "api/v1/public/user/login";
const register = "api/v1/public/user/register";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";

//Product
const GetProductById = "api/v1/product/";
const GetProductByCategory = "api/v1/product/category/";


//Product Category
const GetCategoryFeature = "api/v1/category/feature";
const urlGetSliderHome = "api/v1/home/slider/";

const urls = {
    mainServices : mainServices,
    cartServices: cartServices,
    cart : cart,
    login : login,
    register : register,
    GetCategoryFeature : GetCategoryFeature,
    urlGetSliderHome : urlGetSliderHome,
    loginSocialMedia : loginSocialMedia,
    registerSocialMedia : registerSocialMedia,


}

export default urls
