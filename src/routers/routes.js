import PATH_URL from "./path";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Confirmation from "../pages/Confirmation";
import Products from "../pages/Products";
import Category from "../pages/Category";
import Checkout from "../pages/Checkout";
import PaymentInfoPage from "../pages/PaymentInfo";
import ViewInvoice from "../pages/ViewInvoice";
import NotFoundPage from "../components/NotFoundPage";
import FailedPayment from "../components/FailedPayment";
import ConfirmationError from "../pages/ConfirmationError";
import ForgetPassword from "../pages/ForgetPassword";
import FullLayout from "../layouts/FullLayout";
import MainLayout from "../layouts/MainLayout";
import CustomerLayout from "../layouts/CustomerLayout";
import Search from "../pages/Search";
import Development from "../pages/Development";
import DummyPageProfile from "../pages/DummyPageProfile";
import DummyPageAddress from "../pages/DummyPageAddress";
import DummyPagePassword from "../pages/DummyPagePassword";
import Order from "../pages/Order";


const routes = [
  {
    path: PATH_URL.FORGET_PASSWORD,
    component: ForgetPassword,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.HOME,
    component: Home,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CHECKOUT,
    component: Checkout,
    layout: FullLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.REGISTER,
    component: Register,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CONFIRMATION,
    component: Confirmation,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.PRODUCT_DETAIL,
    component: ProductDetail,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_1,
    component: Category,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_2,
    component: Category,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_3,
    component: Category,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.VIEW_INVOICE,
    component: ViewInvoice,
    layout: FullLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.SEARCH,
    component: Search,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.PRODUCTS,
    component: Products,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.PAYMENT_INFO,
    component: PaymentInfoPage,
    layout: FullLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.DASHBOARD_PROFILE,
    component: DummyPageProfile,
    layout: CustomerLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.DASHBOARD_ADDRESS,
    component: DummyPageAddress,
    layout: CustomerLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.DASHBOARD_PASSWORD,
    component : DummyPagePassword,
    layout: CustomerLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.DASHBOARD_ORDER,
    component : Order,
    layout : CustomerLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.PAYMENT_FAILED,
    component: FailedPayment,
    layout: FullLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.CONFIRMATION_ERROR,
    component: ConfirmationError,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: '/address',
    component: Development,
    layout: FullLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.NOT_FOUND_PAGE,
    component: NotFoundPage,
    layout: MainLayout,
    needAuthenticated: false
  }
];

export default routes

