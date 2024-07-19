import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';
import  Login  from '../components/Login';
const PrivateRoute = ({ path, element }) => {
  const { isLoggedIn } = useAuth();

  // If user is authenticated, render the route element, else redirect to login
  return user ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/Login" replace state={{ from: path }} />
  );
};
