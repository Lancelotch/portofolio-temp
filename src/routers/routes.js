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
import CheckOut from "../pages/Checkout/CheckoutContainer";
import Address from "../pages/Address/";
import CustomerNavigation from "../components/CustomerNavigation";
import PaymentInfoPage from "../pages/PaymentInfo/PaymentInfoContainer";

const routes = [
  {
    path: PATH_URL.HOME,
    breadcrumb: "monggopesen",
    component: Home
  },
  {
    path: PATH_URL.LOGIN,
    component: Login,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.CHECKOUT,
    component: CheckOut,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.REGISTER,
    breadcrumb: "register",
    component: Register,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.CONFIRMATION,
    component: Confirmation
  },
  {
    path: PATH_URL.PRODUCT_DETAIL,
    component: ProductDetail,
    layoutName: "fullLayout"
  },
  {
    path: PATH_URL.CATEGORY,
    component: CategoryContainer
  },
  {
    path: "/category/fashion-pria/:categoryId",
    component: CategoryContainer
  },
  {
    path: "/category/fashion-pria/sepatu/:categoryId",
    component: CategoryContainer
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
    component: PaymentInfoPage
  },
  {
    path: "/address",
    component: Address
  },
  {
    path: "/customer-navigation",
    component: CustomerNavigation
  }
];

export default routes;
