"use client";

import { useState, useEffect } from "react";
import { getSecret } from "lakshay_bogal_testing";
import { useRouter } from "next/navigation";

export default function Home() {
  const [password, setPassword] = useState<null | string>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchSecret() {
      try {
        const secret = await getSecret("948bc7ccdb49888b", "b15ba0d6");
        setPassword(secret);
      } catch (error) {
        console.error("Failed to fetch the secret:", error);
        setPassword("Error fetching secret");
      }
    }

    fetchSecret();
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-3xl font-bold text-white">PassWord: {password}</h1>
      <button
        onClick={() => router.push("/login")}
        className="text-3xl font-bold text-white hover:bg-slate-500"
      >
        Login
      </button>
    </main>
  );
}
