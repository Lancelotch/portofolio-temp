//Root Service
const mainServices = "https://api.monggopesen.com/main-services/";
const cartServices = "https://api.monggopesen.com/cart-services/";
const API_URL_CART = "https://api.monggopesen.com/cart-services/";
const cart = "v1/cart/user";

//Authentication Page
const login = "api/v1/public/user/login";
const register = "api/v1/public/user/register";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";

//User
const urlDetailUser = "api/v1/customer/";

//Product
const GetProductById = "api/v1/product/";
const GetProductByCategory = "api/v1/product/category/";

//Cart
const addToCart = "v1/cart/user/";
const getProductsFromCart = "v1/cart/user/";
const updateProductFromCart = "v1/cart/user/";
const deleteProductFromCart = "v1/cart/user/";


//Address
const urlCustomerAddressDefault = "api/v1/customer/address/default/";
const urlCustomerAddress = "api/v1/customer/address/";
const urlChangeAddressDefault = "api/v1/customer/address/default/";
const urlGetProvince = "api/v1/customer/address/province";
const urlGetCity = "api/v1/customer/address/city";
const ngrokUrlGetProvince = "api/v1/customer/address/province";
const ngrokUrlGetCity = "api/v1/customer/address/city";
const urlAddUserAddress = "api/v1/customer/address";
const urlDeleteAddress = "/api/v1/customer/address/";


//Product Category
const GetCategoryFeature = "api/v1/category/feature";
const urlGetSliderHome = "api/v1/home/slider/";

const urls = {
    urlDetailUser : urlDetailUser,
    addToCart: addToCart,
    GetProductById: GetProductById,
    updateProductFromCart : updateProductFromCart,
    GetProductByCategory: GetProductByCategory,
    mainServices: mainServices,
    cartServices: cartServices,
    cart: cart,
    login: login,
    register: register,
    GetCategoryFeature: GetCategoryFeature,
    urlGetSliderHome: urlGetSliderHome,
    loginSocialMedia: loginSocialMedia,
    registerSocialMedia: registerSocialMedia,
    getProductsFromCart: getProductsFromCart,
    API_URL_CART : API_URL_CART,
    urlCustomerAddressDefault : urlCustomerAddressDefault,
    urlCustomerAddress : urlCustomerAddress,
    urlChangeAddressDefault : urlChangeAddressDefault,
    urlGetProvince : urlGetProvince,
    urlDeleteAddress : urlDeleteAddress,
    urlGetCity : urlGetCity,
    urlAddUserAddress : urlAddUserAddress,
    ngrokUrlGetProvince : ngrokUrlGetProvince,
    ngrokUrlGetCity : ngrokUrlGetCity
}

export default urls