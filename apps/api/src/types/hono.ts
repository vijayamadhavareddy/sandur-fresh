export type AuthUser = {
  id: string;
  phone: string;
  name: string;
  email: string | null;
  role: "customer" | "admin";
};

export type AppVariables = {
  requestId: string;
  user: AuthUser | null;
};

export type AppEnv = {
  Variables: AppVariables;
};
