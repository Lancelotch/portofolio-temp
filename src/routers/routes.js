import HomePage from "../containers/HomePage/HomePage"
import RegisterPage from "../containers/RegisterPage/RegisterPage"
import ProductDetail from "../containers/ProductDetail/ProductDetail"
import Checkout from "../containers/Checkout/Checkout"
import Cart from "../containers/Cart/Cart"
import Dashboard from '../containers/Dashboard/Dashboard'
import InvoiceCustomerDetail from '../components/DashboardFormCustomer/InvoiceCustomerDetail/InvoiceCustomerDetail'
import CategoryProduct from "../containers/CategoryProduct/CategoryProduct";
import ProductSearch from "../containers/ProductSearch/ProductSearch";
import { verificationEmail, confirmationEmail, register, productDetailId, cart, checkout, dashboard, invoiceCustomerDetail, search, categoryProduct } from "./paths";
import ConfirmationEmail from "../containers/Confirmation/ConfirmationEmail";


const routes = [{
        path: "/",
        breadcrumb: 'Monggopesen',
        component: HomePage
    },
    {
        path: register,
        breadcrumb: "Register",
        component: RegisterPage
    },
    {
        path: productDetailId,
        component: ProductDetail
    },
    {
        path: cart,
        component: Cart
    },
    {
        path: checkout,
        component: Checkout
    },
    {
        path: dashboard,
        component: Dashboard
    },
    {
        path: invoiceCustomerDetail,
        component: InvoiceCustomerDetail
    },
    {
        path: search, 
        component:ProductSearch
    },    
    {
        path: categoryProduct,
        component: CategoryProduct
    },
    {
        path:confirmationEmail, 
        component:ConfirmationEmail
    }
]


export default routes;