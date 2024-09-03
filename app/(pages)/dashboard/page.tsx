"use client";
import { fetchSecretByUser } from "@/app/api/Secret";
import SecretCard from "@/app/components/dashboard/SecretCard";
import SecretInputField from "@/app/components/dashboard/SecretInputField";
import { AuthContext } from "@/app/context/AuthContext";
import { useLogout } from "@/app/hooks/useLogout";
import { Secret } from "@/app/interface/Secret";
import React, { useContext, useEffect, useState } from "react";

const Page: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { user } = authContext || {};
  const [secrets, setSecrets] = useState<Secret[]>([]);
  const [error, setError] = useState("");
  const [addSecret, setAddSecret] = useState(false);
  const userLogout = useLogout();

  useEffect(() => {
    const fetchSecrets = async () => {
      const response = await fetchSecretByUser();
      if (response.status === 200) {
        setSecrets(response.data.data);
      } else {
        setError(response.data);
      }
    };

    if (user) fetchSecrets();
  }, [user]);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-6">Secret Variables Dashboard</h1>

      <button
        onClick={() => userLogout()}
        className="text-3xl font-bold text-white hover:bg-slate-500"
      >
        Logout
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {!user && <p className="text-red-500 mb-4">Please log in.</p>}

      {user && (
        <div>
          <p className="text-lg font-medium mb-2">Hi, {user.firstname}</p>
          <div className="flex flex-col gap-6">
            {secrets.map((secret) => (
              <SecretCard key={secret.id} secret={secret} />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={() => setAddSecret(!addSecret)}
        className="text-3xl font-bold text-white hover:bg-slate-500 mt-6"
      >
        {addSecret ? "Close" : "Add Secret"}
      </button>

      {addSecret && (
        <div className="mt-4">
          <SecretInputField
            setAddSecret={setAddSecret}
            setSecrets={setSecrets}
            secrets={secrets}
          />
        </div>
      )}
    </div>
  );
};

export default Page;
