//Root Service
const mainServices = process.env.REACT_APP_API_MAIN_SERVICE;
const cartServices = process.env.REACT_APP_API_CART_SERVICE;
const cart = "cart/user";

//Authentication Page
const login = "public/user/login";
const register = "public/user/register";
const loginSocialMedia = "public/user/login-sosmed";
const registerSocialMedia = "public/user/register-sosmed";

//User
const DetailUser = "customer/";

//Product
const GetProductById = "product/";
const GetProductByCategory = "product/category/";


//Address
const CustomerAddressDefault = "customer/address/default/";
const CustomerAddress = "customer/address/";
const ChangeAddressDefault = "customer/address/default/";
const GetProvince = "customer/address/province";
const GetCity = "customer/address/city";
const NgrokGetProvince = "customer/address/province";
const NgrokGetCity = "customer/address/city";
const AddUserAddress = "customer/address";
const DeleteAddress = "/customer/address/";

//Invoice
const GetInvoice = "invoice/";

//Cart
const addToCart = "cart/user/";
const getProductsFromCart = "cart/user/";
const updateProductFromCart = "cart/user/";
const deleteProductFromCart = "cart/user/";

//Courier
const GetCourier = "courier/cost";

//Generate Order Id
const GenerateOrderId = "order/generate/";


//Order
const AddOrder = "order";

//Payment
const CreatePayment = "payment";


//Product Category
const GetCategoryFeature = "category/feature";
const GetSliderHome = "home/slider/";

const urls = {
    mainServices : mainServices,
    cartServices: cartServices,
    cart : cart,
    DetailUser : DetailUser,
    login : login,
    addToCart: addToCart,
    GetProductById: GetProductById,
    updateProductFromCart : updateProductFromCart,
    GetProductByCategory: GetProductByCategory,
    DetailUser : DetailUser,
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
    GetSliderHome: GetSliderHome,
    loginSocialMedia: loginSocialMedia,
    registerSocialMedia: registerSocialMedia,
    getProductsFromCart: getProductsFromCart,
    CustomerAddressDefault : CustomerAddressDefault,
    CustomerAddress : CustomerAddress,
    ChangeAddressDefault : ChangeAddressDefault,
    GetProvince : GetProvince,
    DeleteAddress : DeleteAddress,
    GetCity : GetCity,
    GetCourier : GetCourier,
    GenerateOrderId : GenerateOrderId,
    AddUserAddress : AddUserAddress,
    AddOrder : AddOrder,
    CreatePayment : CreatePayment,
    deleteProductFromCart : deleteProductFromCart,
    NgrokGetProvince : NgrokGetProvince,
    NgrokGetCity : NgrokGetCity,
    GetInvoice: GetInvoice
}


export default urls