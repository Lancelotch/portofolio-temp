//Root Service
const mainServices = process.env.REACT_APP_API_MAIN_SERVICE;
const cartServices = process.env.REACT_APP_API_CART_SERVICE;
const cart = "cart/user";

//Authentication Page
const login = "api/v1/public/user/login";
const register = "api/v1/public/user/register";
const loginSocialMedia = "api/v1/public/user/login-sosmed";
const registerSocialMedia = "api/v1/public/user/register-sosmed";
const activatingCustomer = "api/v1/public/user/actived/";

//User
const detailUser = "customer/";

//Product
const getProductById = "product/";
const getProductByCategory = "product/category/";


//Address
const customerAddressDefault = "customer/address/default/";
const customerAddress = "customer/address/";
const changeAddressDefault = "customer/address/default/";
const getProvince = "customer/address/province";
const getCity = "customer/address/city";
const ngrokGetProvince = "customer/address/province";
const ngrokGetCity = "customer/address/city";
const addUserAddress = "customer/address";
const deleteAddress = "/customer/address/";

//Invoice
const getInvoice = "invoice/";

//Cart
const addToCart = "cart/user/";
const getProductsFromCart = "cart/user/";
const updateProductFromCart = "cart/user/";
const deleteProductFromCart = "cart/user/";

//Courier
const getCourier = "courier/cost";

//Generate Order Id
const generateOrderId = "order/generate/";


//Order
const addOrder = "order";

//Payment
const createPayment = "payment";


//Product Category
const getCategoryFeature = "category/feature";
const getSliderHome = "home/slider/";

const urls = {
    mainServices : mainServices,
    cartServices: cartServices,
    cart : cart,
    login: login,
    register: register,
    loginSocialMedia: loginSocialMedia,
    detailUser : detailUser,
    registerSocialMedia: registerSocialMedia,
    getProductById: getProductById,
    getProductByCategory: getProductByCategory,
    customerAddressDefault : customerAddressDefault,
    customerAddress : customerAddress,
    getProvince : getProvince,
    getCity : getCity,
    addToCart: addToCart,
    updateProductFromCart : updateProductFromCart,
    addToCart: addToCart,
    updateProductFromCart : updateProductFromCart,
    getCategoryFeature: getCategoryFeature,
    getSliderHome: getSliderHome,
    getProductsFromCart: getProductsFromCart,
    changeAddressDefault : changeAddressDefault,
    deleteAddress : deleteAddress,
    getCourier : getCourier,
    generateOrderId : generateOrderId,
    aAddress : addUserAddress,
    addOrder : addOrder,
    createPayment : createPayment,
    deleteProductFromCart : deleteProductFromCart,
    ngrokGetProvince : ngrokGetProvince,
    ngrokGetCity : ngrokGetCity,
    getInvoice: getInvoice,
    activatingCustomer: activatingCustomer
}


export default urls