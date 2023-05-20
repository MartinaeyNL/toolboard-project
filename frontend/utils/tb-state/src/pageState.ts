import {BehaviorSubject, Observable} from "rxjs";

const currentPageSubject = new BehaviorSubject<string | undefined>(undefined);

export function GetCurrentPageObserver(): Observable<string | undefined> {
    return currentPageSubject.asObservable();
}
export function SetCurrentPage(value: string | undefined) {
    currentPageSubject.next(value);
}