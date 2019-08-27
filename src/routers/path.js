const HOME = '/';
const CHECKOUT = '/checkout';
const REGISTER = '/register';
const LOGIN = '/login';
const PRODUCT_DETAIL = '/product-detail/:productId';
const CART = '/cart';
const DASHBOARD_CUSTOMER_LEVEL_1 = '/dashboard-customer/:myorder';
const DASHBOARD_CUSTOMER_LEVEL_2 = '/dashboard-customer/:myorder/:myaccount';
const SEARCH = '/search';
const CATEGORY_LEVEL_1 = '/category/:categoryLevel1';
const CATEGORY_LEVEL_2 = '/category/:categoryLevel1/:categoryLevel2';
const CATEGORY_LEVEL_3 = '/category/:categoryLevel1/:categoryLevel2/:categoryLevel3';
const CONFIRMATION = '/confirmation/:idConfirmation';
const PRODUCTS = '/products';
const VIEW_INVOICE = '/invoice-customer/:invoiceId'
const ORDER_SUMMARY = '/order-summary';
const GET_CATEGORY = '/category';
const PAYMENT_INFO = '/payment-info/:paymentId';
const PAYMENT_FAILED = '/payment-failed';
const NOT_FOUND_PAGE = '*';
const CONFIRMATION_ERROR = '/confirmation';
const FORGET_PASSWORD = '/forget-password';


const PATH_URL = {
    NOT_FOUND_PAGE: NOT_FOUND_PAGE,
    DASHBOARD_CUSTOMER_LEVEL_1: DASHBOARD_CUSTOMER_LEVEL_1,
    DASHBOARD_CUSTOMER_LEVEL_2 :DASHBOARD_CUSTOMER_LEVEL_2,
    VIEW_INVOICE: VIEW_INVOICE,
    LOGIN: LOGIN,
    HOME: HOME,
    PRODUCT_DETAIL: PRODUCT_DETAIL,
    CHECKOUT: CHECKOUT,
    REGISTER: REGISTER,
    CART: CART,
    SEARCH: SEARCH,
    CATEGORY_LEVEL_1: CATEGORY_LEVEL_1,
    CATEGORY_LEVEL_2: CATEGORY_LEVEL_2,
    CATEGORY_LEVEL_3: CATEGORY_LEVEL_3,
    CONFIRMATION: CONFIRMATION,
    PRODUCTS: PRODUCTS,
    ORDER_SUMMARY: ORDER_SUMMARY,
    PAYMENT_INFO: PAYMENT_INFO,
    GET_CATEGORY: GET_CATEGORY,
    PAYMENT_FAILED : PAYMENT_FAILED,
    CONFIRMATION_ERROR: CONFIRMATION_ERROR,
    FORGET_PASSWORD: FORGET_PASSWORD
}

export default PATH_URL;