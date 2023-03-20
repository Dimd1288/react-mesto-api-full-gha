import React from 'react';
import { Navigate } from "react-router-dom";

function ProtectedRouteElement({loggedIn, children}) {
  return (
    !loggedIn ? <Navigate to="/sign-in" replace/> : children
)};

export default ProtectedRouteElement;