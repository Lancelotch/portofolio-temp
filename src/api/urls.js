//Root Service
const MAIN_SERVICES = "https://api.monggopesen.com/main-services/";
const CART_SERVICES = "https://api.monggopesen.com/cart-services/";

//Authentication Page
const CUSTOMER_LOGIN = "api/v1/public/user/login";
const CUSTOMER_REGISTER = "api/v1/public/user/register";
const CUSTOMER_LOGIN_SOSMED = "api/v1/public/user/login-sosmed";
const CUSTOMER_REGISTER_SOSMED = "api/v1/public/user/register-sosmed";
const ACTIVATING_EMAIL = "api/v1/public/user/actived/";

//User
const CUSTOMER_DETAIL = "api/v1/customer/";

//Product
const PRODUCT = "api/v1/product/";
const PRODUCT_BY_CATEGORY = "api/v1/product/category/";


//Address
const ADDRESS_DEFAULT = "api/v1/customer/address/default/";
const ADDRESS = "api/v1/customer/address/";
const PROVINCE = "api/v1/customer/address/province";
const CITY = "api/v1/customer/address/city";

//Invoice
const INVOICE = "api/v1/invoice/";

//Cart
const CART_USER = "v1/cart/user/";

//Courier
const COURIER = "api/v1/courier/cost";

//Generate Order Id
const GENERATE_ORDER_ID = "api/v1/order/generate/";


//Order
const ORDER = "api/v1/order";

//Payment
const CREATE_PAYMENT = "api/v1/payment";


//Product Category
const CATEGORY_FEATURE = "api/v1/category/feature";
const HOME_SLIDER = "api/v1/home/slider/";

const URLS = {
    MAIN_SERVICES : MAIN_SERVICES,
    CART_SERVICES: CART_SERVICES,
    CUSTOMER_LOGIN : CUSTOMER_LOGIN,
    CUSTOMER_REGISTER: CUSTOMER_REGISTER,
    CUSTOMER_LOGIN_SOSMED: CUSTOMER_LOGIN_SOSMED,
    CUSTOMER_REGISTER_SOSMED: CUSTOMER_REGISTER_SOSMED,
    ACTIVATING_EMAIL : ACTIVATING_EMAIL,
    CUSTOMER_DETAIL: CUSTOMER_DETAIL,
    PRODUCT: PRODUCT,
    PRODUCT_BY_CATEGORY: PRODUCT_BY_CATEGORY,
    ADDRESS_DEFAULT : ADDRESS_DEFAULT,
    ADDRESS : ADDRESS,
    PROVINCE : PROVINCE,
    CITY : CITY,
    INVOICE: INVOICE,
    CART_USER : CART_USER,
    COURIER: COURIER,
    GENERATE_ORDER_ID : GENERATE_ORDER_ID,
    ORDER: ORDER,
    CREATE_PAYMENT: CREATE_PAYMENT,
    CATEGORY_FEATURE: CATEGORY_FEATURE,
    HOME_SLIDER : HOME_SLIDER
}


export default URLS;