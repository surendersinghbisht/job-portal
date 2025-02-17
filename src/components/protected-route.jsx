/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  console.log("isLoaded:", isLoaded);
  console.log("isSignedIn:", isSignedIn);
  console.log("User Metadata:", user?.unsafeMetadata);

  if (!isLoaded) {
    return <p>Loading...</p>; 
  }

  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  return children;
};

export default ProtectedRoute;
