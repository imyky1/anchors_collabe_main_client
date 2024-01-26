import React from "react";
import { Navigate } from "react-router-dom";

interface protectedrouteprops {
  children:React.ReactNode,
  navigateCondition:boolean | undefined,
  toUrl:string
}

const ProtectedRoute:React.FC<protectedrouteprops> = ({ children, navigateCondition, toUrl }) => {
  if (navigateCondition) {
    return <Navigate to={toUrl} />;
  }

  else{
    return <>{children}</>;
  }
};

export default ProtectedRoute;
