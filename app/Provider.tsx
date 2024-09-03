// components/Providers.tsx
"use client";
import { AuthProvider } from "./context/AuthContext";
import { useAuthCheck } from "./hooks/useAuthCheck";

export function Providers({ children }: { children: React.ReactNode }) {
  useAuthCheck();
  return <AuthProvider>{children}</AuthProvider>;
}
