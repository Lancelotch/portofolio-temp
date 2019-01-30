import HomePage from "../containers/HomePage/HomePage"
import RegisterPage from "../containers/RegisterPage/RegisterPage"
import ProductDetail from "../containers/ProductDetail/ProductDetail"
import Checkout from "../containers/Checkout/Checkout"
import Cart from "../containers/Cart/Cart"
import Dashboard from '../containers/Dashboard/Dashboard'
import InvoiceCustomerDetail from '../components/DashboardFormCustomer/InvoiceCustomerDetail/InvoiceCustomerDetail'

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
    }
]


export default routes;