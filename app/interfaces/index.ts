export interface LoginCredentials {
  email: string;
  password: string;
}

export interface Action {
  type: string
  data?: any
  message?: string
}