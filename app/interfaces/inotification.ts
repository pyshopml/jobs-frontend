interface INotification{
  message: string;
  type: 'warning' | 'normal';
  hideDuration?: number;
  action?: {
    label: string,
    onClick: () => void;
  }
}

export default INotification;