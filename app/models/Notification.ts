import { MsgType, IEvent } from '../interfaces';

interface NotificationData {
  message: string;
  duration: number;
  type: string;
  label?: string;
}

export abstract class Notification {
  _message: string;
  _type: string;
  _duration: number;
  _label: string;

  constructor(vals: NotificationData) {
    this._message = vals.message;
    this._type = vals.type;
    this._duration = vals.duration;
    this._label = vals.label || 'Действие выполнено успешно!';
  }

  get type(): string {
    return this._type;
  }

  get message(): string {
    return this._message;
  }

  get duration(): number {
    return this._duration;
  }

  get label(): string {
    return this._label;
  }

  abstract triggerAction()
}

export class SuccessNotification extends Notification {
  
  action: () => void;

  constructor(vals: IEvent) {
    super(Object.assign(vals, { type: 'normal', duration: 5000 }));

    this.action = vals.action;
  }

  triggerAction() {
    this.action();
  }
}

export class WarningNotification extends Notification {

  constructor(vals: IEvent) {
    super(Object.assign(vals, { type: 'warning', duration: 3000, label: 'Закрыть' }));
  }

  triggerAction() {
    return null;
  }
}
