import { MsgType, Event } from '../interfaces';

export abstract class Notification {
  message: string;
  type: MsgType;
  duration: number;
  label: string;

  constructor(vals: Event) {
    this.message = vals.message;
    this.type = vals.type;
  }

  getType() {
    return this.type;
  }

  getMessage() {
    return this.message;
  }

  abstract getDuration()
  abstract triggerAction()
  abstract getLabel()
}

export class SuccessNotification extends Notification {
  
  action: () => void;

  constructor(vals: Event) {
    super(vals);

    this.label = vals.label;
    this.action = vals.action;

    this.duration = 5000;
  }

  getDuration() {
    return this.duration;
  }

  getLabel() {
    return this.label;
  }

  triggerAction() {
    this.action();
  }
}

export class WarningNotification extends Notification {

  constructor(vals: Event) {
    super(vals);

    this.duration = 3000;
    this.label = 'Закрыть';
  }

  getDuration() {
    return this.duration;
  }

  getLabel() {
    return this.label;
  }

  triggerAction() {
    return null;
  }
}
