// hooks/useAuthCheck.tsx
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "../context/AuthContext";

export const useAuthCheck = () => {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext) {
      if (!authContext.user) {
        router.push("/login"); // Redirect to login if no user is found
      } else {
        authContext.refreshToken(); // Refresh the token on page load
      }
    } else {
      router.push("/login");
    }
  }, [authContext, router]);
};
