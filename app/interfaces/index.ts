export type MsgType = 'warning' | 'normal';

export interface IEvent {
  message: string;
  label?: string;
  action?: () => void;
}
export interface Action {
  type: string;
  errorMessage?: string;
  data?: any;
  message?: any;
}
export interface INewPost{
  title: string;
  description: any;
  keywords: string[];
}
export interface INotification{
  message: string;
  type: MsgType;
  hideDuration?: number;
  action?: {
    label: string,
    onClick: () => void;
  }
}