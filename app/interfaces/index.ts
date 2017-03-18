export type MsgType = 'warning' | 'normal';

export interface Event {
  message: string;
  type: MsgType;
  label?: string;
  action?: () => void;
}

export interface Action {
  type: string
  data?: any
  message?: string
}

