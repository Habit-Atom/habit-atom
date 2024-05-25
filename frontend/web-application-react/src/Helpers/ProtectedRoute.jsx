import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAuthToken } from './axios_helper';

export const ProtectedRoute = ({element}) => {
  const token = getAuthToken();
  
  if (!token) {
    return <Navigate to="/auth" />;
  }

  return element;
};
