import { MsgType } from './index';

interface INotification{
  message: string;
  type: MsgType;
  hideDuration?: number;
  action?: {
    label: string,
    onClick: () => void;
  }
}

export default INotification;