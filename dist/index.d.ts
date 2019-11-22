import SubjectInterface from './interfaces/SubjectInterface';
declare class Heimdall {
    private observers;
    private $subject;
    constructor();
    private setSubject;
    private subscribe;
    private unsubscribe;
    private unsubscribeAll;
    private notify;
    subject(name: string, subject: Function): SubjectInterface;
}
declare const _default: Heimdall;
export default _default;
