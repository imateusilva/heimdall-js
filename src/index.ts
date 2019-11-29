import SubjectInterface from './interfaces/SubjectInterface';
import ObserverInterface from './interfaces/ObserverInterface';

/**
 * Base class which creates the subjects, subscribe and unsubscribe observers
 */
class Heimdall {
  private observers: Object = {};
  private $subject: string = null;

  /**
   * Bind all class methods, so every method can access the $subject variable
   */
  constructor() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.unsubscribeAll = this.unsubscribeAll.bind(this);
    this.notify = this.notify.bind(this);
  }

  /**
   * Defines the subject to manipulate the observers
   * @param {String} subjectName
   */
  private setSubject(subjectName: string): void {
    this.$subject = subjectName;
  }

  /**
   * Subscribes an observer to the subject
   * @param {String|Function} observer
   * @param {Function} observerFn
   */
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

  /**
   * Unsubscribes a named observer from subject
   * @param {String} observerName
   */
  private unsubscribe(observerName: string): void {
    this.observers[this.$subject] = this.observers[this.$subject].filter(
      (item: ObserverInterface) => item.name !== observerName,
    );
  }

  /**
   * Unsubscribes all observers from subject
   */
  private unsubscribeAll(): void {
    this.observers[this.$subject] = [];
  }

  /**
   * Notify all, multiple or single observer
   * @param {any} data
   * @param {String|Array|null} observers
   */
  private notify(data: any, observers?: string | string[]): void {
    const subjectObservers = this.observers[this.$subject];

    // Check if there are any observers on the current subject
    if (!subjectObservers || !subjectObservers.length) {
      return;
    }

    // Notify all observers if there were no specified observers
    if (!observers) {
      for (let i in subjectObservers) {
        subjectObservers[i].fn(data);
      }

      return;
    }

    // If the specified observers are a string, find him and execute it
    if (typeof observers === 'string') {
      const observer = subjectObservers.find((item: ObserverInterface) => item.name === observers);

      if (!observer) {
        throw new Error(
          `The observer ${observers} was not found on observers list.`,
        );
        
        return;
      }

      observer.fn(data);

      return;
    }

    // If there is a list of specific observers to notify, find and execute them
    const notificationList = subjectObservers.filter(
      (item: ObserverInterface) => observers.includes(item.name),
    );

    for (let i in notificationList) {
      notificationList[i].fn(data);
    }
  }

  /**
   * Create the subject and set it on the context ($subject)
   * @param {String} name
   * @param {Function} subject
   */
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

export default new Heimdall();
