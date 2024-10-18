/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { getUserRole } from '@/utils/auth'; // Adjust based on your project structure

interface ProtectedRouteProps {
  Component: React.ComponentType<any>;
  allowedRoles: string[];
  [key: string]: any;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ Component, allowedRoles, ...rest }) => {
  const userRole = getUserRole(); // Replace this with your role-checking logic

  return (
    <Route
      {...rest}
      element={allowedRoles.includes(userRole) ? <Component /> : <Navigate to="/unauthorized" replace />}
    />
  );
};

export default ProtectedRoute;
