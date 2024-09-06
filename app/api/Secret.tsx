import axios from "axios";
import { CreateSecret, UpdateSecretProps } from "../interface/Secret";
import { baseUrl } from ".";
export const fetchSecretByUser = async () => {
  try {
    const response = await axios.get(`${baseUrl}/env/getuserenvs/`, {
      withCredentials: true,
    });
    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    } else {
      throw error; // Re-throw if it's an unexpected error
    }
  }
};

export const addSecret = async (data: CreateSecret) => {
  try {
    const response = await axios.post(
      `${baseUrl}/env/add/`,
      { ...data },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    } else {
      throw error; // Re-throw if it's an unexpected error
    }
  }
};

export const deleteSecret = async (id: string) => {
  try {
    const response = await axios.delete(`${baseUrl}/env/delete/?id=${id}`, {
      withCredentials: true,
    });

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    } else {
      throw error; // Re-throw if it's an unexpected error
    }
  }
};

export const updateSecret = async (data: UpdateSecretProps) => {
  try {
    console.log(data);
    const response = await axios.put(
      `${baseUrl}/env/update/`,
      { ...data },
      { withCredentials: true }
    );

    return response;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return error.response;
    } else {
      throw error; // Re-throw if it's an unexpected error
    }
  }
};
