import SubjectInterface from './interfaces/SubjectInterface';
/**
 * Base class which creates the subjects, subscribe and unsubscribe observers
 */
declare class Heimdall {
    private observers;
    private $subject;
    /**
     * Bind all class methods, so every method can access the $subject variable
     */
    constructor();
    /**
     * Defines the subject to manipulate the observers
     * @param {String} subjectName
     */
    private setSubject;
    /**
     * Subscribes an observer to the subject
     * @param {String|Function} observer
     * @param {Function} observerFn
     */
    private subscribe;
    /**
     * Unsubscribes a named observer from subject
     * @param {String} observerName
     */
    private unsubscribe;
    /**
     * Unsubscribes all observers from subject
     */
    private unsubscribeAll;
    /**
     * Notify all, multiple or single observer
     * @param {any} data
     * @param {String|Array|null} observers
     */
    private notify;
    /**
     * Create the subject and set it on the context ($subject)
     * @param {String} name
     * @param {Function} subject
     */
    subject(name: string, subject: Function): SubjectInterface;
}
declare const _default: Heimdall;
export default _default;
