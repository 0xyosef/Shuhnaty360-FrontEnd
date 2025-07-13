let globalLogout: (() => void) | null = null;
export const setGlobalLogout = (fn: () => void) => {
  globalLogout = fn;
};

export const callGlobalLogout = () => {
  if (globalLogout) globalLogout();
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const saveAccessToken = (token: string) => {
  localStorage.setItem("access_token", token);
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const saveRefreshToken = (token: string) => {
  localStorage.setItem("refresh_token", token);
};

export const getUserId = () => {
  const id = localStorage.getItem("user_id");
  if (id) {
    return parseInt(id);
  }
  return null;
};

export const saveUserId = (userId: string) => {
  localStorage.setItem("user_id", userId);
};

export const getCurrentUser = () => {
  return localStorage.getItem("current_user");
};

export const removeSessionsData = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("user_id");
};
