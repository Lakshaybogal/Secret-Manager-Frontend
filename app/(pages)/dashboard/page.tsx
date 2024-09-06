"use client";
import React, { useContext, useEffect, useState } from "react";
import { fetchSecretByUser } from "@/app/api/Secret";
import SecretCard from "@/app/components/dashboard/SecretCard";
import SecretInputField from "@/app/components/dashboard/SecretInputField";
import { AuthContext } from "@/app/context/AuthContext";
import { useLogout } from "@/app/hooks/useLogout";
import { Secret } from "@/app/interface/Secret";

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
        setError(response.data.error);
      }
    };

    if (user) fetchSecrets();
  }, [user]);

  const handleDelete = (id: number) => {
    setSecrets((prevSecrets) =>
      prevSecrets.filter((secret) => secret.id !== id)
    );
  };

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
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="grid grid-cols-6 items-center text-center gap-4 w-full ">
              <p className="text-gray-400 text-sm">Name</p>
              <p className="text-gray-400 text-sm">Key</p>
              <p className="text-gray-400 text-sm">Value</p>
              <p className="text-gray-400 text-sm">Access Password</p>
              <p className="text-gray-400 text-sm">Options</p>
              <p className="text-gray-400 text-sm">More Info</p>
            </div>
            {secrets.map((secret) => (
              <SecretCard
                key={secret.id}
                secret={secret}
                onDelete={handleDelete}
                setError={setError}
              />
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
