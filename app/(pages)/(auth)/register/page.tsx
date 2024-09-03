"use client";
import { register } from "@/app/api/Auth";
import { AuthContext } from "@/app/context/AuthContext";
import { RegisterUser } from "@/app/interface/User";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";

const Page: React.FC = () => {
  const authContext = useContext(AuthContext);
  const { setUser, user } = authContext || {};
  const [registerData, setRegisterData] = useState<RegisterUser>({
    email: "",
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const navigate = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await register(registerData);
    if (response.status === 200 && response.data.token && setUser) {
      setUser({
        id: response.data.data.id,
        email: response.data.data.email,
        username: response.data.data.username,
        firstname: response.data.data.firstname,
      });
      setRedirect(true); // Trigger redirect
    } else {
      setError(response.data.error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (redirect || user) {
      navigate.push("/dashboard");
    }
  }, [redirect, user]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="bg-gray-800 p-8 rounded-lg shadow-lg"
        >
          {error && <p className="mb-4 text-red-500">{error}</p>}
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={registerData.username}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={registerData.email}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="contact"
            >
              Contact
            </label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={registerData.contact}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="firstname"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={registerData.firstname}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="lastname"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={registerData.lastname}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-400 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={registerData.password}
              onChange={(e) => handleChange(e)}
              className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Login
            </button>
          </div>
        </form>
        <Link href="/login">Login</Link>
      </div>
    </div>
  );
};

export default Page;
