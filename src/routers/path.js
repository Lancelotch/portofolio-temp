const HOME = '/';
const CHECKOUT = '/checkout';
const REGISTER = '/register';
const LOGIN = '/login';
const PRODUCT_DETAIL = '/product/:productId';
const CART = '/cart';
const DASHBOARD_CUSTOMER_LEVEL_1 = '/dashboard-customer/:myorder';
const DASHBOARD_CUSTOMER_LEVEL_2 = '/dashboard-customer/:myorder/:myaccount';
const DASHBOARD_PROFILE = '/dashboard/profile';
const DASHBOARD_ADDRESS = '/dashboard/address';
const DASHBOARD_PASSWORD = '/dashboard/password';
const DASHBOARD_ORDER = '/dashboard/order';
const SEARCH = '/search';
const CATEGORY_LEVEL_1 = '/category/:categoryLevel1';
const CATEGORY_LEVEL_2 = '/category/:categoryLevel1/:categoryLevel2';
const CATEGORY_LEVEL_3 = '/category/:categoryLevel1/:categoryLevel2/:categoryLevel3';
const CONFIRMATION = '/confirmation/:idConfirmation';
const PRODUCTS = '/products';
const VIEW_INVOICE = '/invoice/:invoiceId'
const ORDER_SUMMARY = '/order-summary';
const GET_CATEGORY = '/category';
const PAYMENT_INFO = '/payment-info/:paymentId';
const PAYMENT_FAILED = '/payment-failed';
const NOT_FOUND = '/not-found'
const NOT_FOUND_PAGE = '*';
const ERROR = '/500';
const FORGET_PASSWORD = '/forget-password';
const RESET_PASSWORD = '/reset/:key';
const USER_GUIDE_HOW_TO_SHOP = '/cara-belanja';
const USER_GUIDE_DELIVERY_TIME = '/lama-pengiriman';
const USER_GUIDE_HOW_TO_PAY = '/cara-bayar';
const USER_GUIDE_TRACK_SHIPMENT = '/lacak-pengiriman';
const USER_GUIDE_CONTACT_US = '/hubungi-kami';
const USER_GUIDE_ABOUT_US =  '/tentang-kami';
const USER_GUIDE_CAREER = '/karir';
const USER_GUIDE_TERMS_CONDITION = '/syarat-ketentuan';
const USER_GUIDE_PRIVACY_POLICY = '/kebijakan-privasi';

const PATH_URL = {
    NOT_FOUND_PAGE: NOT_FOUND_PAGE,
    NOT_FOUND: NOT_FOUND,
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
    ERROR: ERROR,
    FORGET_PASSWORD: FORGET_PASSWORD,
    DASHBOARD_PROFILE,
    DASHBOARD_ADDRESS,
    DASHBOARD_PASSWORD,
    DASHBOARD_ORDER,
    RESET_PASSWORD,
    USER_GUIDE_ABOUT_US,
    USER_GUIDE_CAREER,
    USER_GUIDE_CONTACT_US,
    USER_GUIDE_DELIVERY_TIME,
    USER_GUIDE_HOW_TO_PAY,
    USER_GUIDE_HOW_TO_SHOP,
    USER_GUIDE_PRIVACY_POLICY,
    USER_GUIDE_TERMS_CONDITION,
    USER_GUIDE_TRACK_SHIPMENT
}

export default PATH_URL;