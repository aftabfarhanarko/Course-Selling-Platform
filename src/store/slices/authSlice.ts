import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  user: any | null;
  isAuthenticated: boolean;
}

const AUTH_STORAGE_KEY = "course_platform_auth";

function cookieAttrs() {
  if (typeof window === "undefined") return "";
  return window.location.protocol === "https:" ? "; Secure" : "";
}

function persistRoleCookie(role: string) {
  if (typeof window === "undefined") return;
  const attrs = cookieAttrs();
  document.cookie = `role=${encodeURIComponent(role)}; Path=/; Max-Age=2592000; SameSite=Lax${attrs}`;
}

function getInitialAuth(): { user: any | null; token: string | null } {
  if (typeof window === "undefined") return { user: null, token: null };

  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) return { user: null, token: null };

    const parsed = JSON.parse(raw) as { user?: any; token?: unknown };
    const tokenFromRoot = typeof parsed.token === "string" ? parsed.token : null;
    const tokenFromUser = typeof parsed.user?.token === "string" ? parsed.user.token : null;
    const token = tokenFromUser ?? tokenFromRoot;

    const user = parsed.user ?? (token ? { token } : null);

    if (user?.role) {
      persistRoleCookie(String(user.role));
    }

    return { user: user && token && !user.token ? { ...user, token } : user, token };
  } catch {
    return { user: null, token: null };
  }
}

const initial = getInitialAuth();

const initialState: AuthState = {
  user: initial.user,
  isAuthenticated: !!initial.token || !!initial.user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
