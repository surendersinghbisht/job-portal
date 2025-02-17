import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { BarLoader } from "react-spinners";
import { useCallback } from "react";

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  const navigateUser = useCallback((currRole) => {
    navigate(currRole === "recruiter" ? "/post-job" : "/jobs");
  },[navigate]);

  const handleRoleSelection = async (role) => {
    try {
      await user.update({ unsafeMetadata: { role } });
      await user.reload(); // Force reload of user data
      console.log("Updated Role:", user?.unsafeMetadata?.role);
      navigateUser(role);
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };
  

  useEffect(() => {
    if (user?.unsafeMetadata?.role) {
      navigateUser(user?.unsafeMetadata.role);
    }
  }, [navigateUser, user]);

  if (!isLoaded) {
    return <BarLoader className="mb-4" width={"100%"} color="#36d7b7" />;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-40">
      <h2 className="gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter">
        I am a...
      </h2>
      <div className="mt-16 grid grid-cols-2 gap-4 w-full md:px-40">
        <Button
          variant="blue"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("candidate")}
        >
          Candidate
        </Button>
        <Button
          variant="destructive"
          className="h-36 text-2xl"
          onClick={() => handleRoleSelection("recruiter")}
        >
          Recruiter
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;