import { useRouter } from "next/navigation";
import { logout } from "../api/Auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export function useLogout() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const { setUser } = authContext || {};
  const userLogout = async () => {
    await logout();
    if (setUser) setUser(null);
    router.push("/login");
  };

  return userLogout;
}
