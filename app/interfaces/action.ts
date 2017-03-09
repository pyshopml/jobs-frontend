export interface Action {
  type: string;
  errorMessage?: string;
  data?: any;
  message?: any;
}