/* eslint-disable react/prop-types */
import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useUser();
  const { pathname } = useLocation();

  console.log("isSignedIn:", isSignedIn);
console.log("User Metadata:", user?.unsafeMetadata);

  // If user data isn't loaded yet, show a loading spinner or similar
  if (!isLoaded) {
    return <div>Loading...</div>; // Or a spinner
  }

  // If the user is not signed in, redirect to sign-in page
  if (!isSignedIn) {
    return <Navigate to="/?sign-in=true" />;
  }

  // If the user is not assigned a role and tries to visit something other than /onboarding, redirect to /onboarding
  if (!user?.unsafeMetadata?.role && pathname !== "/onboarding") {
    return <Navigate to="/onboarding" />;
  }

  // Optionally, you can redirect users who already have a role but are trying to visit /onboarding (e.g., redirect to /jobs or /post-job)
  if (user?.unsafeMetadata?.role && pathname === "/onboarding") {
    return <Navigate to={user?.unsafeMetadata?.role === "recruiter" ? "/post-job" : "/jobs"} />;
  }

  // Return children if all checks pass
  return children;
};

export default ProtectedRoute;
