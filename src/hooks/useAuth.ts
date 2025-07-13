// src/auth/useAuth.js
import { use } from "react";
import AuthContext from "../context/AuthContext";

export const useAuth = () => {
  const context = use(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
