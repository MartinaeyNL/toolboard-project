import { BehaviorSubject, Observable } from "rxjs";
import {Dashboard} from "@toolboard/tb-api";

const currentDashboardSubject = new BehaviorSubject<Dashboard | undefined>(undefined);

export function GetCurrentDashboardObserver(): Observable<Dashboard | undefined> {
    return currentDashboardSubject.asObservable();
}
export function SetCurrentDashboard(value: Dashboard | undefined) {
    currentDashboardSubject.next(value);
}