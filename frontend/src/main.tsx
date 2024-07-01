import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './pages/error-page';
import { Signup } from './pages/Signup';
import { Login } from './pages/Login';
import { Homepage } from './pages/Orders';
import { OrderDetailsPage } from './pages/OrderDetails';
import { CreateOrder } from './pages/Create-Order';
import { Products } from './pages/Products';
import { CreateProduct } from './pages/create-product';
import { EditProduct } from './pages/edit-product';
import { Employees } from './pages/employees';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/orders/:orderId",
    element: <OrderDetailsPage />,
  },
  {
    path: "/orders/create",
    element: <CreateOrder />,
  },
  {
    path: "/products",
    element: <Products />,
  },
  {
    path: "/products/add",
    element: <CreateProduct />,
  },
  {
    path: "/products/:productName",
    element: <EditProduct />,
  },
  {
    path: "/employees",
    element: <Employees />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
