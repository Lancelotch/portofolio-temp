import HomePage from "../containers/HomePage/HomePage"
import RegisterPage from "../containers/RegisterPage/RegisterPage"
import ProductDetail from "../containers/ProductDetail/ProductDetail"
import Checkout from "../containers/Checkout/Checkout"
import Cart from "../containers/Cart/Cart"
import Dashboard from '../containers/Dashboard/Dashboard'
import InvoiceCustomerDetail from '../components/DashboardFormCustomer/InvoiceCustomerDetail/InvoiceCustomerDetail'
import CategoryProduct from "../containers/CategoryProduct/CategoryProduct";
import ProductSearch from "../containers/ProductSearch/ProductSearch";
import { verificationEmail, confirmationEmail } from "./paths";
import ConfirmationEmail from "../containers/Confirmation/ConfirmationEmail";

const routes = [{
        path: "/",
        breadcrumb: 'Monggopesen',
        component: HomePage
    },
    {
        path: "/register",
        breadcrumb: "Register",
        component: RegisterPage
    },
    {
        path: "/product-detail/:productId",
        component: ProductDetail
    },
    {
        path: "/cart",
        component: Cart
    },
    {
        path:"/checkout",
        component: Checkout
    },
    {
        path:"/dashboard-customer/:tab",
        component: Dashboard
    },
    {
        path:"/sidebar-profile/:invoiceNumber",
        component: InvoiceCustomerDetail
    },
    {
        path:"/search", 
        component:ProductSearch
    },
    {
        path:confirmationEmail, 
        component:ConfirmationEmail
    }
]


export default routes;