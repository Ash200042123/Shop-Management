import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { orderSlice } from '@/api/order-slice';
import { authSlice } from './api/auth-slice';
import { productSlice } from './api/product-slice';
import { employeeSlice } from './api/employee-slice';
import { invoiceSlice } from './api/invoices-slice';
import { salesSlice } from './api/sales-slice';


const rootReducer = combineReducers({
  [orderSlice.reducerPath]: orderSlice.reducer,
  [authSlice.reducerPath]: authSlice.reducer,
  [productSlice.reducerPath]: productSlice.reducer,
  [employeeSlice.reducerPath]: employeeSlice.reducer,
  [invoiceSlice.reducerPath]: invoiceSlice.reducer,
  [salesSlice.reducerPath]: salesSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      orderSlice.middleware,
      authSlice.middleware,
      productSlice.middleware,
      employeeSlice.middleware,
      invoiceSlice.middleware,
      salesSlice.middleware,
    ),
});

// setupListeners(store.dispatch);

export default store;
