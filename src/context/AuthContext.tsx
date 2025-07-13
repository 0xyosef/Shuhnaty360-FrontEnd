// src/auth/AuthContext.js
import rolePrivileges from "@/utils/privileges";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "../../Api";
import { loginUser } from "../api/auth.api";
import { useUserQuery } from "../api/users.api";
import { LoginCredentials, LoginResponse, Privilege } from "../types";
import {
  getAccessToken,
  getRefreshToken,
  getUserId,
  removeSessionsData,
  saveAccessToken,
  saveRefreshToken,
  saveUserId,
  setGlobalLogout,
} from "../utils/authUtils";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  user: Users | null;
  privileges: Set<Privilege> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

type AuthAction =
  | { type: "LOGIN_SUCCESS"; payload: LoginResponse }
  | { type: "LOGOUT" }
  | {
      type: "SET_USER";
      payload: { user: Users; privileges: Set<Privilege> } | null;
    }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null };

const AuthReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        accessToken: action.payload.access,
        refreshToken: action.payload.refresh,
        userId: action.payload.user.id,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case "LOGOUT":
      return {
        ...state,
        accessToken: null,
        refreshToken: null,
        userId: null,
        user: null,
        privileges: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case "SET_USER":
      return {
        ...state,
        user: action.payload?.user || null,
        privileges: action.payload?.privileges || null,
      };
    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

const accessToken = getAccessToken();

const initialState: AuthState = {
  accessToken: accessToken,
  refreshToken: getRefreshToken(),
  userId: getUserId(),
  user: null,
  privileges: null,
  isAuthenticated: !!accessToken,
  isLoading: false,
  error: null,
};

type AuthContextType = {
  accessToken: string | null;
  refreshToken: string | null;
  userId: number | null;
  user: Users | null;
  privileges: Set<Privilege> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: any;
  login: (data: LoginCredentials) => void;
  logout: () => void;
  loginIsLoading: boolean;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data: LoginResponse) => {
      saveAccessToken(data.access);
      saveRefreshToken(data.refresh);
      saveUserId(data.user.id.toString());
      dispatch({ type: "LOGIN_SUCCESS", payload: data });
    },
    onError: (error: AxiosError<{ detail: string }>) => {
      dispatch({
        type: "SET_ERROR",
        payload: error.response?.data?.detail || "هناك مشكلة في تسجيل الدخول",
      });
    },
  });

  const userQuery = useUserQuery(state.userId as number);

  const handleLogout = useCallback(() => {
    removeSessionsData();
    dispatch({ type: "LOGOUT" });
    navigate("/login");
    queryClient.clear();
  }, [navigate, queryClient]);

  useEffect(() => {
    if (userQuery.data?.data && state.userId) {
      const user = userQuery.data.data;

      if (!user.is_active) {
        handleLogout();
      }

      let privileges = null;
      if (user.is_superuser) {
        privileges = new Set(rolePrivileges.super_admin.privileges);
      } else if (user.is_staff) {
        privileges = new Set(rolePrivileges.staff.privileges);
      } else {
        privileges = new Set(rolePrivileges.active.privileges);
      }

      dispatch({
        type: "SET_USER",
        payload: {
          user,
          privileges,
        },
      });
    } else {
      dispatch({
        type: "SET_USER",
        payload: null,
      });
    }
  }, [handleLogout, state.userId, userQuery.data?.data]);

  useEffect(() => {
    setGlobalLogout(handleLogout);
  }, [handleLogout]);

  useEffect(() => {
    if (!state.userId) {
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: "SET_ERROR", payload: null });
  }, []);

  const authContextValue = useMemo(() => {
    return {
      accessToken: state.accessToken,
      refreshToken: state.refreshToken,
      userId: state.userId,
      user: state.user,
      privileges: state.privileges,
      isAuthenticated: state.isAuthenticated,
      isLoading:
        state.isLoading || loginMutation.isPending || userQuery.isLoading,
      error: state.error,
      login: loginMutation.mutate,
      logout: handleLogout,
      clearError,
      loginIsLoading: loginMutation.isPending || userQuery.isLoading,
    };
  }, [
    state.accessToken,
    state.refreshToken,
    state.userId,
    state.user,
    state.privileges,
    state.isAuthenticated,
    state.isLoading,
    state.error,
    loginMutation.isPending,
    loginMutation.mutate,
    userQuery.isLoading,
    handleLogout,
    clearError,
  ]);

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
