import axios from "axios";
import { baseUrl } from ".";
import { RegisterUser } from "../interface/User";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/login/`,
      { email, password },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Login failed", error.response);
      return error.response;
    } else {
      console.error("An unexpected error occurred", error);
      throw error; // Re-throw if it's an unexpected error
    }
  }
};

export const register = async (data: RegisterUser) => {
  try {
    const response = await axios.post(
      `${baseUrl}/user/register/`,
      { ...data },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Registration failed", error.response);
      return error.response;
    } else {
      console.error("An unexpected error occurred", error);
      throw error; // Re-throw if it's an unexpected error
    }
  }
};

export const refresh = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/refresh/`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Refresh failed", error.response);
      return error.response;
    } else {
      console.error("An unexpected error occurred", error);
      throw error; // Re-throw if it's an unexpected error
    }
  }
};

export const logout = async () => {
  try {
    const response = await axios.get(`${baseUrl}/user/logout/`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("Logout failed", error.response);
      return error.response;
    } else {
      console.error("An unexpected error occurred", error);
      throw error; // Re-throw if it's an unexpected error
    }
  }
};
