const HOME = '/';
const CHECKOUT = '/checkout';
const REGISTER = '/register';
const LOGIN = '/login';
const PRODUCT_DETAIL = '/product-detail/:productId';
const CART = '/cart';
const DASHBOARD_CUSTOMER = '/dashboard-customer';
const SEARCH = '/search';
const CATEGORY_LEVEL_1 = '/category/:categoryLevel1';
const CATEGORY_LEVEL_2 = '/category/:categoryLevel1/:categoryLevel2';
const CATEGORY_LEVEL_3 = '/category/:categoryLevel1/:categoryLevel2/:categoryLevel3';
const CONFIRMATION = '/confirmation/:idConfirmation';
const PRODUCTS = '/products';
const EXAMPLE = '/example';
const VIEW_INVOICE = '/invoice-customer/:invoiceId'
const ORDER_SUMMARY = '/order-summary';
const GET_CATEGORY = '/category'
const PAYMENT_INFO = '/payment-info/:paymentId';


const PATH_URL = {
    VIEW_INVOICE : VIEW_INVOICE,
    LOGIN: LOGIN,
    HOME: HOME,
    PRODUCT_DETAIL: PRODUCT_DETAIL,
    CHECKOUT: CHECKOUT,
    REGISTER: REGISTER,
    CART: CART,
    DASHBOARD_CUSTOMER: DASHBOARD_CUSTOMER,
    SEARCH: SEARCH,
    CATEGORY_LEVEL_1: CATEGORY_LEVEL_1,
    CATEGORY_LEVEL_2: CATEGORY_LEVEL_2,
    CATEGORY_LEVEL_3: CATEGORY_LEVEL_3,
    CONFIRMATION: CONFIRMATION,
    PRODUCTS: PRODUCTS,
    EXAMPLE: EXAMPLE,
    ORDER_SUMMARY: ORDER_SUMMARY,
    PAYMENT_INFO: PAYMENT_INFO,
    GET_CATEGORY: GET_CATEGORY
}

export default PATH_URL;