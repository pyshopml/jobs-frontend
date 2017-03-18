import { MsgType, Event } from '../interfaces';

export abstract class Notification {
  _message: string;
  _type: MsgType;
  _duration: number;
  _label: string;

  constructor(vals: Event) {
    this._message = vals.message;
  }

  get type(): string {
    return this._type;
  }

  get message(): string {
    return this._message;
  }

  abstract triggerAction()
}

export class SuccessNotification extends Notification {
  
  action: () => void;

  constructor(vals: Event) {
    super(vals);

    this._type = 'normal';
    this._duration = 5000;
    this._label = vals.label;
    this.action = vals.action;

  }

  get duration() {
    return this._duration;
  }

  get label() {
    return this._label;
  }

  triggerAction() {
    this.action();
  }
}

export class WarningNotification extends Notification {

  constructor(vals: Event) {
    super(vals);

    this._type = 'warning';
    this._duration = 3000;
    this._label = 'Закрыть';
  }

  get duration(): number {
    return this._duration;
  }

  get label(): string {
    return this._label;
  }

  triggerAction() {
    return null;
  }
}
