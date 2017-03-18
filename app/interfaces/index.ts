export type MsgType = 'warning' | 'normal';

export interface IEvent {
  message: string;
  label?: string;
  action?: () => void;
}

export interface Action {
  type: string
  data?: any
  message?: string
}

