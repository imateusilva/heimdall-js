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

  private subscribe(observer: string | Function, observerFn?: Function): void {
    const hasName = typeof observer === 'string';

    if (hasName && !observerFn) {
      throw new Error('You need to pass an observer function as second param when you add a name to an observer');
    }

    const observerObject = {
      name: hasName ? observer : null,
      fn: hasName ? observerFn : observer,
    };

    this.observers[this.$subject].push(observerObject);
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
