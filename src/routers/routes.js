import PATH_URL from './path';
import Home from '../containers/Home';
import Register from '../containers/Register';
import Test from '../containers/Test';
import Confirmation from '../containers/Confirmation';

const routes = [{
        path: PATH_URL.HOME,
        breadcrumb: 'monggopesen',
        component: Home
    },
    {
        path: PATH_URL.REGISTER,
        breadcrumb: "register",
        component: Register
    },
    {
        path: PATH_URL.CONFIRMATION,
        component:Confirmation
    },
    {
        path: "test",
        component:Test
    }
]

export default routes;