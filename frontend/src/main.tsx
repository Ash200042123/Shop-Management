import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/error-page";
import { Signup } from "./pages/signup";
import { Login } from "./pages/login";
import { Homepage } from "./pages/orders";
import { OrderDetailsPage } from "./pages/order-details";
import { CreateOrder } from "./pages/create-order";
import { Products } from "./pages/products";
import { CreateProduct } from "./pages/create-product";
import { EditProduct } from "./pages/edit-product";
import { Employees } from "./pages/employees";
import { EditEmployee } from "./pages/edit-employee";
import { Invoices } from "./pages/invoices";
import { ViewInvoice } from "./pages/view-invoice";
import { DashboardLayout } from "./layouts/dashboard-layout";
import AuthLayout from "./layouts/auth-layout";
import { Sales } from "./pages/sales";
import { Toaster } from "./components/ui/sonner";
import store from "./store";
import { Provider } from "react-redux";


const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "",
        element: <Homepage />,
      },
      {
        path: "/employees/:employeeId",
        element: <EditEmployee />,
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

      {
        path: "/invoices",
        element: <Invoices />,
      },
      {
        path: "/invoices/:invoiceId",
        element: <ViewInvoice />,
      },
      {
        path: "/sales",
        element: <Sales />,
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
    <Toaster />
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
