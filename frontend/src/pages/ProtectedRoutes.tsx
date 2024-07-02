

import { getCookie } from '@/utils/cookie-utils';
import React, { ComponentType } from 'react';
import { Route, Navigate } from 'react-router-dom';


interface ProtectedRouteProps {
    element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, ...rest }) => {
    const isAuthenticated = !!getCookie(); // Replace with your authentication logic
  
    return (
      <Route
        {...rest}
        element={isAuthenticated ? element : <Navigate to="/login" replace />}
      />
    );
  };

export default ProtectedRoute;
