export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  email: string;
  password: string;
  name: string;
}

export interface Action {
  type: string;
  payload?: any;
  errorMessage?: string;
}

export interface iValidateToken {
  auth_token: string;
}