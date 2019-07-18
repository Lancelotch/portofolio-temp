import PATH_URL from "./path";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import ProductDetail from "../pages/ProductDetail";
import Confirmation from "../pages/Confirmation";
import Product from "../pages/Product";
import Example from "../pages/Example";
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
import SidebarExample from "../pages/CustomerNavigation/prosesrefactor.jsx";

const routes = [
  {
    path: PATH_URL.FORGET_PASSWORD,
    component: ForgetPassword,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.HOME,
    breadcrumb: "monggopesen",
    component: Home
  },
  {
    path: PATH_URL.LOGIN,
    component: notRequiredAuth(Login),
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.CHECKOUT,
    component: requiredAuth(Checkout),
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.REGISTER,
    breadcrumb: "register",
    component: notRequiredAuth(Register),
    // component: Register,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.CONFIRMATION,
    component: Confirmation,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.PRODUCT_DETAIL,
    component: ProductDetail
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_1,
    component: CategoryContainer
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_2,
    component: CategoryContainer
  },
  {
    path: PATH_URL.CATEGORY_LEVEL_3,
    component: CategoryContainer
  },
  // {
  //     path: '/category/fashion-pria/:categoryId',
  //     component: CategoryContainer
  // },
  // {
  //     path: '/category/fashion-pria/sepatu/:categoryId',
  //     component: CategoryContainer
  // },
  {
    path: PATH_URL.VIEW_INVOICE,
    component: ViewInvoice,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.SEARCH,
    component: SearchContainer
  },
  {
    path: PATH_URL.PRODUCTS,
    component: Product
  },
  {
    path: PATH_URL.EXAMPLE,
    component: Example
  },
  {
    path: PATH_URL.PAYMENT_INFO,
    component: PaymentInfoPage,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.DASHBOARD_CUSTOMER,
    component: requiredAuth(CustomerNavigation),
    layoutName: "customerLayout"
  },
  {
    path: PATH_URL.PAYMENT_FAILED,
    component: FailedPayment,
    layoutName: "fullLayout"
  },
  {
    path : PATH_URL.PROSES_REFACTOR_DASHBOARD,
    component: SidebarExample

  },
  {
    path: PATH_URL.CONFIRMATION_ERROR,
    component: ConfirmationError,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.NOT_FOUND_PAGE,
    component: NotFoundPage
  }
    
];

export default routes;
