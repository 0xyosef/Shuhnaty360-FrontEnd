import axios from "axios";
import { baseURL } from "../../config";
import {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from "../types";

export const loginUser = async (
  credentials: LoginCredentials,
): Promise<LoginResponse> => {
  const response = await axios.post(
    `${baseURL}/api/accounts/token/`,
    credentials,
  );
  return response.data;
};

export const refreshAccessToken = async (
  token: string,
): Promise<RefreshTokenResponse> => {
  const response = await axios.post(`${baseURL}/api/accounts/token/refresh/`, {
    refresh: token,
  });

  return response.data;
};
