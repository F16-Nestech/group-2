import RegisterPage from "../pages/SignupPage/SignupPage"
import HomePage from "../pages/HomePage/HomePage";
import NotFound from "../pages/NotFound/NotFound";
import OrdersPage from "../pages/OrdersPage/OrdersPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";

export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
    },
    {
        path: '/register',
        page: RegisterPage,
        isShowHeader: true,
    },
    {
        path: '/orders',
        page: OrdersPage,
        isShowHeader: true,

    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,

    },
    {
        path: '*',
        page: NotFound,
    }
]
