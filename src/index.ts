import SubjectInterface from './interfaces/SubjectInterface';
import ObserverInterface from './interfaces/ObserverInterface';

class Observable {
  private observers: Object = {};
  private $subject: string = null;

  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.unsubscribeAll = this.unsubscribeAll.bind(this);
    this.notify = this.notify.bind(this);
  }

  private setSubject(subjectName: string): void {
    this.$subject = subjectName;
  }

  private subscribe(observer: Function, observerName?: string): void {
    this.observers[this.$subject].push({ name: observerName, fn: observer });
  }

  private unsubscribe(observerName: string) {
    this.observers[this.$subject] = this.observers[this.$subject].filter(
      (item: ObserverInterface) => item.name !== observerName,
    );
  }

  private unsubscribeAll(observerName: string) {
    this.observers[this.$subject] = [];
  }

  private notify(data: any, observers?: string | string[]): void {
    const subjectObservers = this.observers[this.$subject];

    if (!subjectObservers || !subjectObservers.length) {
      return;
    }

    if (!observers) {
      for (let i in subjectObservers) {
        subjectObservers[i].fn(data);
      }

      return;
    }

    if (typeof observers === 'string') {
      const observer = subjectObservers.find((item: ObserverInterface) => item.name === observers);

      if (!observer) {
        throw new Error(
          `The observer ${observers} was not found on observers list.`,
        );
      }

      observer.fn(data);

      return;
    }

    const notificationList = subjectObservers.filter(
      (item: ObserverInterface) => observers.includes(item.name),
    );

    for (let i in notificationList) {
      notificationList[i].fn(data);
    }
  }

  public subject(name: string, subject: Function): SubjectInterface {
    this.observers[name] = [];
    this.setSubject(name);

    subject(this.notify);

    return {
      subscribe: this.subscribe,
      unsubscribe: this.unsubscribe,
      unsubscribeAll: this.unsubscribeAll,
    };
  }
}

export default new Observable();
