import PATH_URL from "./path";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Confirmation from "../pages/Confirmation";
import Product from "../pages/Product";
import CategoryContainer from "../pages/Category/CategoryContainer";
import SearchContainer from "../pages/Search/SearchContainer";
import Checkout from "../pages/Checkout";
import CustomerNavigation from "../pages/CustomerNavigation";
import requiredAuth from "../hoc/requiredAuth";
import notRequiredAuth from "../hoc/notRequiredAuth";
import PaymentInfoPage from "../pages/PaymentInfo";
import ViewInvoice from "../pages/ViewInvoice";
import NotFoundPage from "../components/NotFoundPage";
import FailedPayment from "../components/FailedPayment";
import ConfirmationError from "../pages/ConfirmationError";
import ForgetPassword from "../pages/ForgetPassword";
import FullLayout from "../layouts/FullLayout";
import MainLayout from "../layouts/MainLayout";
import SidebarNavigationCustomer from "../layouts/NavigationCustomer";


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
    //needAuthenticated: false
  },
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layout: FullLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CHECKOUT,
    component: requiredAuth(Checkout),
    layout: FullLayout,
    needAuthenticated: true
  },
  {
    path: PATH_URL.REGISTER,
    component: notRequiredAuth(Register),
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
    component: CategoryContainer,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_2,
    component: CategoryContainer,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_3,
    component: CategoryContainer,
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
    component: SearchContainer,
    layout: MainLayout,
    needAuthenticated: false
  },
  {
    path: PATH_URL.PRODUCTS,
    component: Product,
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
    path: PATH_URL.DASHBOARD_CUSTOMER_LEVEL_1,
    component: requiredAuth(CustomerNavigation),
    layout: SidebarNavigationCustomer,
    needAuthenticated: true
  },
  {
    path: PATH_URL.DASHBOARD_CUSTOMER_LEVEL_2,
    component: requiredAuth(CustomerNavigation),
    layout: SidebarNavigationCustomer,
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
    path: PATH_URL.NOT_FOUND_PAGE,
    component: NotFoundPage,
    layout: MainLayout,
    needAuthenticated: false
  }

];

export default routes

