import React from 'react';
import ReactDOM from 'react-dom/client';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import Home from './pages/Home';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import Login from './pages/Login';
import Register from './pages/Register';
import Shipping from './pages/Shipping';
import Payment from './pages/Payment';
import Review from './pages/Review';
import Order from './pages/Order';
import Profile from './pages/Profile';
import OrderList from './pages/admin/OrderList';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route
            path='/'
            element={<App />}
        >
            <Route
                index={true}
                path='/'
                element={<Home />}
            />
            <Route
                path='/product/:id'
                element={<ProductPage />}
            />
            <Route
                path='/cart'
                element={<Cart />}
            />
            <Route
                path='/login'
                element={<Login />}
            />
            <Route
                path='/register'
                element={<Register />}
            />

            <Route
                path=''
                element={<PrivateRoute />}
            >
                <Route
                    path='/shipping'
                    element={<Shipping />}
                />
                <Route
                    path='/payment'
                    element={<Payment />}
                />
                <Route
                    path='/review'
                    element={<Review />}
                />
                <Route
                    path='/order/:id'
                    element={<Order />}
                />
                <Route
                    path='/profile'
                    element={<Profile />}
                />
            </Route>

            <Route
                path=''
                element={<AdminRoute />}
            >
                <Route
                    path='/admin/orderlist'
                    element={<OrderList />}
                />
            </Route>
        </Route>
    )
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PayPalScriptProvider deferLoading={false}>
                <RouterProvider router={router} />
            </PayPalScriptProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
