import { BehaviorSubject, Observable } from "rxjs";

const currentDashboardSubject = new BehaviorSubject<string>(undefined);

export function getCurrentDashboardObserver(): Observable<string> {
    return currentDashboardSubject.asObservable();
}
export function setCurrentDashboard(value: string) {
    currentDashboardSubject.next(value);
}